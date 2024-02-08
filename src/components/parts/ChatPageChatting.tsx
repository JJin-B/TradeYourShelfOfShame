import React, { useEffect, useRef, useState } from "react";
import ChatPageChattingMessage from "./ChatPageChattingMessage";
import { apiAddress } from "../../Wrapper/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Chat } from "../classes/interfaces";

const getChattingWith = (
  receiverId: string,
  userId: string,
  senderName: string,
  receiverName: string
) => {
  return receiverId === userId ? senderName : receiverName;
};

interface ChattingProps {
  userId: string;
  chat: Chat;
  fetchMessages: () => void;
  formOnSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatId: string,
    message: string
  ) => void;
}

const ChatPageChatting: React.FC<ChattingProps> = ({
  userId,
  chat,
  fetchMessages,
  formOnSubmit,
}) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const navigator = useNavigate();

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const data = {
      userId: userId,
      chatId: chat._id,
    };
    const fetchUrl = apiAddress + `/message/readMessages`;
    axios.put(fetchUrl, data).then().catch();
    fetchMessages;
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [chat.messages]);

  const titleOnClick = (postId: string) => {
    navigator(`/posting/${postId}`);
  };

  const chattingWith = getChattingWith(
    chat.receiver._id,
    userId,
    chat.sender.name,
    chat.receiver.name
  );

  return (
    <div>
      <div className="bg-gray-200 h-[480px] rounded-lg p-2">
        <div
          className="text-lg hover:underline cursor-pointer flex justify-center p-3 bg-gray-200 border-b-2 border-gray-700"
          onClick={() => titleOnClick(chat.posting._id)}
        >
          {chat.posting.title}
        </div>
        <div
          ref={messagesContainerRef}
          className="mt-2 bg-gray- h-4/5 overflow-auto"
        >
          {chat.messages.map((message, index) => (
            <ChatPageChattingMessage
              key={message._id || index}
              userId={userId}
              chattingWith={chattingWith}
              message={message}
            />
          ))}
        </div>
      </div>
      <div className="my-2 flex">
        <form
          className="w-full flex items-center"
          onSubmit={(e) => {
            formOnSubmit(e, chat._id, message), setMessage("");
          }}
        >
          <input
            className="w-full h-10 rounded-md p-2"
            placeholder="Your message"
            value={message}
            onChange={(e) => inputOnChange(e)}
          />
          <button
            className="mx-1 inline-block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPageChatting;
