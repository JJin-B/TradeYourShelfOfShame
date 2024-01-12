import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useAuth } from "../../Wrapper/AuthContext";

interface UserInfo {
  _id: string;
  name: string;
}

interface Props {
  userPOI: UserInfo;
}
const UserTradeSendMessage: React.FC<Props> = ({ userPOI }) => {
  const { user } = useAuth();
  const isLoggedIn = user ? true : false;

  const [message, setMessage] = useState<string>(
    `Hello ${userPOI.name}. I'm interested in trading and wanted to check if you might be interested as well. Please let me know your thoughts when you have a moment. Thank you!!`
  );

  useEffect(() => {
    !isLoggedIn && setMessage("Please sign in to send a message!");
  }, [user]);

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    console.log(message);
  };

  return (
    <div className="flex flex-col items-center w-full border my-2 rounded-md">
      <form className="p-3 w-4/5">
        <label
          htmlFor="message"
          className="flex justify-center text-lg font-bold rounded-md p-2 w-full bg-gray-300 text-gray-900"
        >
          Send Message
        </label>
        <textarea
          id="message"
          rows={6}
          className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={message}
          onChange={onChangeTextArea}
          disabled={!isLoggedIn}
        ></textarea>
        {isLoggedIn && <Button text="Send" className={`m-1`}/>}
      </form>
    </div>
  );
};

export default UserTradeSendMessage;
