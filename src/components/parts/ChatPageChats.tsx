import React from "react";
import ChatPageChatList from "./ChatPageChatList";

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

interface Props {
  chats: Chat[];
  userId: string;
  chatOnClick: (cid: string) => void;
}
const ChatPageChats: React.FC<Props> = ({ chats, userId, chatOnClick }) => {

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
