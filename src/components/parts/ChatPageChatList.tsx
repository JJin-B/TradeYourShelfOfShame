import LetterWithRound from "./LetterWithRound";
import { Chat } from "../classes/interfaces";
import { truncateText } from "../functions/utils";


const getStypeByUnread = (chat: Chat, userId: string) => {
  const unreadMessage = chat.messages.filter((message) => {
    return message.sentBy !== userId && !message.isViewed;
  });
  const isNew: boolean = unreadMessage.length > 0;

  const liStyleClass = `flex items-start h-24 w-full ${
    isNew ? "bg-gray-400" : "bg-gray-200"
  } hover:bg-gray-500 hover:text-white m-1 border-2 rounded-md text-xs`;

  return { isNew, liStyleClass };
};

const getChatInfo = (chat: Chat, userId: string) => {
  const { isNew, liStyleClass } = getStypeByUnread(chat, userId);

  const title = chat.posting.title
    ? truncateText(chat.posting.title, 50)
    : "Trade";

  const chattingWith =
    chat.sender._id === userId ? chat.receiver.name : chat.sender.name;

  const dateSent = new Date(
    chat.messages[chat.messages.length - 1].createdAt
  ).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return { isNew, liStyleClass, title, chattingWith, dateSent };
};

interface ChatListProps {
  chat: Chat;
  userId: string;
  chatOnClick: (cid: string) => void;
}
const ChatPageChatList: React.FC<ChatListProps> = ({
  chat,
  userId,
  chatOnClick,
}) => {
  const { isNew, liStyleClass, title, chattingWith, dateSent } = getChatInfo(
    chat,
    userId
  );

  return (
    <li className={liStyleClass}>
      <button
        className="flex w-full h-full"
        onClick={() => chatOnClick(chat._id)}
      >
        <div className="flex items-center h-full">
          <LetterWithRound letter={chattingWith[0]} />
        </div>
        <div className="flex flex-col w-full h-full">
          <div className="flex justify-center text-base sm:text-lg">
            {title}
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
