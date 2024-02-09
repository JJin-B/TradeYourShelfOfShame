import ChatPageChats from "./ChatPageChats";
import { Chat } from "../classes/interfaces";

const getStyleClass = (displayOption: "all" | "new" | "my") => {
  const displayOptionClass = `p-3 bg-gray-200 border-b-2 text-slate-500 hover:text-slate-700 hover:border-slate-700`;

  const allStyleClass =
    displayOptionClass +
    (displayOption === "all" ? " text-slate-900 border-black" : "");
  const newStyleClass =
    displayOptionClass +
    (displayOption === "new" ? " text-slate-900 border-black" : "");
  const myStyleClass =
    displayOptionClass +
    (displayOption === "my" ? " text-slate-900 border-black" : "");

  return { allStyleClass, newStyleClass, myStyleClass };
};

interface ChatOverviewProps {
  displayChats: Chat[];
  userId: string;
  displayOptionOnClick: (option: "all" | "new" | "my") => void;
  displayOption: "all" | "new" | "my";
  chatOnClick: (cid: string) => void;
}
const ChatPageOverview: React.FC<ChatOverviewProps> = ({
  displayChats,
  userId,
  displayOption,
  displayOptionOnClick,
  chatOnClick,
}) => {
  const { allStyleClass, newStyleClass, myStyleClass } =
    getStyleClass(displayOption);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="m-3 rounded-sm flex items-center h-14">
        <button
          className={allStyleClass}
          onClick={() => displayOptionOnClick("all")}
        >
          All Messages
        </button>
        <button
          className={newStyleClass}
          onClick={() => displayOptionOnClick("new")}
        >
          New Messages
        </button>
        <button
          className={myStyleClass}
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
