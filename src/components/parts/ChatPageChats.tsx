import ChatPageChatList from "./ChatPageChatList";
import { Chat } from "../classes/interfaces";

interface ChatsProps {
  chats: Chat[];
  userId: string;
  chatOnClick: (cid: string) => void;
}
const ChatPageChats: React.FC<ChatsProps> = ({
  chats,
  userId,
  chatOnClick,
}) => {
  return (
    <div>
      <ul>
        {chats.map((chat) => (
          <ChatPageChatList
            key={chat._id}
            chat={chat}
            userId={userId}
            chatOnClick={chatOnClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChatPageChats;
