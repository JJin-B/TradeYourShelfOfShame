import React, { useEffect, useRef, useState } from "react";
import ChatPageChattingMessage from "./ChatPageChattingMessage";
import { apiAddress } from "../../Wrapper/AuthContext";
import axios from "axios";

interface Message {
  _id: string;
  message: string;
  sentBy: string;
  isViewed: boolean;
  createdAt: Date;
}

interface Chat {
  _id: string;
  sender: {
    _id: string;
    name: string;
  };
  receiver: {
    _id: string;
    name: string;
  };
  posting: {
    _id: string;
    title: string;
    author: string;
  };
  messages: Message[];
}

interface Props {
  userId: string;
  chat: Chat;
  fetchMessages: () => void;
  formOnSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatId: string,
    message: string
  ) => void;
}

const ChatPageChatting: React.FC<Props> = ({
  userId,
  chat,
  fetchMessages,
  formOnSubmit,
}) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");

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

  const talkingTo =
    chat.receiver._id === userId ? chat.sender.name : chat.receiver.name;
  const className = "bg-gray-200 h-[480px] rounded-lg p-2";
  return (
    <div>
      <div className={className}>
        <div className="text-lg hover:underline cursor-pointer flex justify-center p-3 bg-gray-200 border-b-2 border-gray-700">
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
              talkingTo={talkingTo}
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
