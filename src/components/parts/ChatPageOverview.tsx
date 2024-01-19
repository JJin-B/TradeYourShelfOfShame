import React from "react";
import ChatPageChats from "./ChatPageChats";

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
  displayChats: Chat[];
  userId: string;
  displayOptionOnClick: (option: "all" | "new" | "my") => void;
  displayOption: "all" | "new" | "my";
  chatOnClick: (cid: string) => void;
}
const ChatPageOverview: React.FC<Props> = ({
  displayChats,
  userId,
  displayOption,
  displayOptionOnClick,
  chatOnClick,
}) => {
  const displayOptionClass = `p-3 bg-gray-200 border-b-2 text-slate-500 hover:text-slate-700 hover:border-slate-700`;
  // console.log(displayOption);
  return (
    <div className="mx-auto max-w-4xl">
      <div className="m-3 rounded-sm flex items-center h-14">
        <button
          className={
            displayOptionClass +
            (displayOption === "all" ? " text-slate-900 border-black" : "")
          }
          onClick={() => displayOptionOnClick("all")}
        >
          All Messages
        </button>
        <button
          className={
            displayOptionClass +
            (displayOption === "new" ? " text-slate-900 border-black" : "")
          }
          onClick={() => displayOptionOnClick("new")}
        >
          New Messages
        </button>
        <button
          className={
            displayOptionClass +
            (displayOption === "my" ? " text-slate-900 border-black" : "")
          }
          onClick={() => displayOptionOnClick("my")}
        >
          My Postings
        </button>
      </div>

      <div className="border border-2 rounded-md h-[720px] bg-gray-300 my-2 overflow-auto">
        {displayChats.length > 0 ? (
          <ChatPageChats
            chats={displayChats}
            userId={userId}
            chatOnClick={chatOnClick}
          />
        ) : (
          <div className="flex justify-center text-xl p-3">
            There are no chats
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPageOverview;
