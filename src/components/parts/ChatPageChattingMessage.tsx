import LetterWithRound from "./LetterWithRound";

import { Message } from "../classes/interfaces";

const getChattingInfo = (userId: string, message: Message) => {
  const isMyMessage = message.sentBy === userId;
  const dateSent = new Date(message.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const styleClassName = `flex justify-${isMyMessage ? "end" : "start"} items-${
    isMyMessage ? "end" : "start"
  }`;
  const color = isMyMessage ? "bg-blue-800 text-white" : "bg-gray-300";

  return { isMyMessage, dateSent, styleClassName, color };
};

interface ChattingMessageProps {
  userId: string;
  chattingWith: string;
  message: Message;
}

const ChatPageChattingMessage: React.FC<ChattingMessageProps> = ({
  userId,
  chattingWith,
  message,
}) => {
  const { isMyMessage, dateSent, styleClassName, color } = getChattingInfo(
    userId,
    message
  );

  return (
    <div className={styleClassName}>
      {!isMyMessage && (
        <div>
          <LetterWithRound letter={chattingWith[0]} />
        </div>
      )}
      <div className={styleClassName + " flex-col min-w-[240px]"}>
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
