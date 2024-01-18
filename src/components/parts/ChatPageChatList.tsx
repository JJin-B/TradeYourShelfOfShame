import React from "react";
import LetterWithRound from "./LetterWithRound";

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
  };
  messages: Message[];
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

interface Props {
  chat: Chat;
  userId: string;
}
const ChatPageChatList: React.FC<Props> = ({ chat, userId }) => {
  const undreadMessage = chat.messages.filter((message) => {
    return message.sentBy !== userId && !message.isViewed;
  });

  const isNew = undreadMessage.length > 0;

  const liClassName = `flex items-start h-24 w-full ${
    isNew ? "bg-gray-400" : "bg-gray-200"
  } hover:bg-gray-500 hover:text-white m-1 border-2 rounded-md text-xs`;
  const isSentChat = chat.sender._id === userId;
  const chattingWith = isSentChat ? chat.receiver.name : chat.sender.name;
  const dateSent = new Date(
    chat.messages[chat.messages.length - 1].createdAt
  ).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <li className={liClassName}>
      <button className="flex w-full h-full">
        <div className="flex items-center h-full">
          <LetterWithRound letter={chattingWith[0]} />
        </div>
        <div className="flex flex-col w-full h-full">
          <div className="flex justify-center text-base sm:text-lg">
            {chat.posting.title
              ? truncateText(chat.posting.title, 50)
              : "Trade"}
          </div>
          <div className="flex items-center justify-center h-full text-slate-800">
            {chat.messages[chat.messages.length - 1].message}
          </div>
          <div className="text-blue-800">
            <div>{dateSent}</div>
          </div>
        </div>
        <div className="hidden sm:flex items-center justify-center h-full w-5 mr-5">
          {isNew && <span className="bg-green-900 w-2 h-2 rounded-full"></span>}
        </div>
      </button>
    </li>
  );
};

export default ChatPageChatList;
