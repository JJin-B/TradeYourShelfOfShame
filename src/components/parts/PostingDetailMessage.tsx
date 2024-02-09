import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import Button from "./Button";
import { useAuth, apiAddress } from "../../Wrapper/AuthContext";

interface data {
  senderId: string;
  receiverId: string;
  postId: string;
  message: string;
}

interface PostingDetailMessageProps {
  posting: {
    _id: string;
    author: {
      _id: string;
      name: string;
    };
  };
}

const PostingDetailMessage: React.FC<PostingDetailMessageProps> = ({
  posting,
}) => {
  const navigator = useNavigate();
  const { user } = useAuth();

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setMessage(
      user
        ? `Hello ${posting.author.name}. I am interested in this item. Please let me know if this is available!`
        : "Please sign in to send a message!"
    );
  }, [user]);

  const messageOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (user) {
      setMessage(e.target.value);
    }
  };

  const sendMessage = () => {
    const fetchUrl = apiAddress + `/message/`;
    if (!user) {
      navigator("/signin");
      toast.warn("Please sign in to send a message");
      return;
    }
    const data: data = {
      senderId: user._id,
      receiverId: posting.author._id,
      postId: posting._id,
      message: message,
    };

    axios
      .put(fetchUrl, data)
      .then((res: AxiosResponse) => {
        navigator(`/chat?chatId=${res.data._id}`);
        toast.success(
          `Your message has been sent to ${res.data.receiver.name}`
        );
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <div className="flexmt-5">
      <form className="p-3 border border-gray-300">
        <label
          htmlFor="message"
          className="p-1 px-3 font-black block mb-2 text-sm font-medium text-gray-900 dark:text-white dark:bg-gray-700 rounded-md"
        >
          Your message
        </label>
        <textarea
          id="message"
          rows={6}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={message}
          onChange={messageOnChange}
          disabled={!user}
        ></textarea>
        <Button text="Send" className="mt-1" onClick={sendMessage} />
      </form>
    </div>
  );
};

export default PostingDetailMessage;
