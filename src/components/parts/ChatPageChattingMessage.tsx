import React from "react";
import LetterWithRound from "./LetterWithRound";

interface Message {
  _id: string;
  message: string;
  sentBy: string;
  isViewed: boolean;
  createdAt: Date;
}

interface Props {
  userId: string;
  talkingTo: string;
  message: Message;
}
const ChatPageChattingMessage: React.FC<Props> = ({
  userId,
  talkingTo,
  message,
}) => {
  const isMyMessage = message.sentBy === userId;
  const dateSent = new Date(message.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const className = `flex justify-${isMyMessage ? "end" : "start"} items-${
    isMyMessage ? "end" : "start"
  }`;
  const color = isMyMessage ? "bg-blue-800 text-white" : "bg-gray-300";

  return (
    <div className={className}>
      {!isMyMessage && (
        <div>
          <LetterWithRound letter={talkingTo[0]} />
        </div>
      )}
      <div className={className + " flex-col min-w-[240px]"}>
        <div
          className={`flex items-end mr-2 w-4/5 border-2 rounded-lg p-2 ${color}`}
        >
          {message.message}
        </div>
        <div className="text-xs w-4/5 mr-2 flex justify-between">
          {isMyMessage && (
            <span className="font-bold text-slate-500">
              {message.isViewed ? "READ" : "SENT"}
            </span>
          )}
          <span>{dateSent}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatPageChattingMessage;
