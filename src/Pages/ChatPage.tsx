import React from "react";
import { useState, useEffect } from "react";
import { apiAddress } from "../Wrapper/AuthContext";
import { useLocation } from "react-router-dom";

import ChatPageOverview from "../components/parts/ChatPageOverview";

import axios, { AxiosResponse } from "axios";
import ChatPageChatting from "../components/parts/ChatPageChatting";

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
}
const ChatPage: React.FC<Props> = ({ userId }) => {
  const location = useLocation();

  const [chatSelected, setChatSelected] = useState<Chat | null>(null);

  const [chats, setChats] = useState<Chat[]>([]);
  const [displayChats, setDisplayChats] = useState<Chat[]>([]);
  const [displayOption, setDisplayOption] = useState<"all" | "new" | "my">(
    "all"
  );

  const queryParams = new URLSearchParams(location.search);
  const chatId = queryParams.get("chatId")?.toLowerCase();

  const fetchMessages = (chatId?: string) => {
    const fetchUrl = apiAddress + `/message/${userId}`;

    axios
      .get<Chat[]>(fetchUrl)
      .then((res: AxiosResponse<Chat[]>) => {
        const data = res.data.sort((a, b) => {
          const lastMessageA = a.messages[a.messages.length - 1];
          const lastMessageB = b.messages[b.messages.length - 1];

          if (lastMessageA && lastMessageB) {
            return (
              new Date(lastMessageB.createdAt).getTime() -
              new Date(lastMessageA.createdAt).getTime()
            );
          }

          // Handle cases where there are no messages in one or both chats
          return 0;
        });

        setChats(data);
        if (chatId) {
          const chat = data.find((chat) => chat._id === chatId) || null;
          setChatSelected(chat);
        }
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  useEffect(() => {
    fetchMessages(chatId);
    const intervalId = setInterval(fetchMessages, 600000);

    return () => {
      clearInterval(intervalId);
    };
  }, [location]);

  useEffect(() => {
    if (displayOption === "all") {
      setDisplayChats(chats);
    } else if (displayOption === "new") {
      const chatToDisplay = chats?.filter((chat) =>
        chat.messages.some(
          (message) => message.sentBy !== userId && message.isViewed === false
        )
      );
      setDisplayChats(chatToDisplay || []);
    } else if (displayOption === "my") {
      const chatToDisplay = chats?.filter(
        (chat) => chat.posting.author === userId
      );
      setDisplayChats(chatToDisplay || []);
    }
  }, [displayOption, chats, userId]);

  const displayOptionOnClick = (option: "all" | "new" | "my") => {
    setDisplayOption(option);
  };

  const chatOnClick = (chatId: string) => {
    const chat = chats.find((chat) => chat._id === chatId) || null;
    setChatSelected(chat);
  };

  const backToOverview = () => {
    setChatSelected(null);
    fetchMessages();
  };

  const sendMessage = (
    e: React.FormEvent<HTMLFormElement>,
    chatId: string,
    message: string
  ) => {
    e.preventDefault();

    if (!message) {
      return;
    }

    const fetchUrl = apiAddress + `/message/${chatId}`;
    const data = {
      chatId: chatId,
      userId: userId,
      messageContent: message,
    };
    axios
      .put(fetchUrl, data)
      .then((res: AxiosResponse<Chat[]>) => {
        const data = res.data.sort((a, b) => {
          const lastMessageA = a.messages[a.messages.length - 1];
          const lastMessageB = b.messages[b.messages.length - 1];

          if (lastMessageA && lastMessageB) {
            return (
              new Date(lastMessageB.createdAt).getTime() -
              new Date(lastMessageA.createdAt).getTime()
            );
          }

          // Handle cases where there are no messages in one or both chats
          return 0;
        });

        setChats(data);
        if (chatId) {
          const chat = data.find((chat) => chat._id === chatId) || null;
          setChatSelected(chat);
          console.log(chat);
        }
      })
      .catch((error) => {
        console.error("Error sending messages:", error);
      });
  };

  if (!chatSelected) {
    return (
      <ChatPageOverview
        displayChats={displayChats}
        userId={userId}
        displayOption={displayOption}
        displayOptionOnClick={displayOptionOnClick}
        chatOnClick={chatOnClick}
      />
    );
  } else {
    return (
      <div className="mx-auto max-w-4xl">
        <button
          className="m-3 p-1 rounded-md flex items-center h-14 w-20 bg-gray-200 justify-center"
          onClick={backToOverview}
        >
          Back To Messages
        </button>
        {
          <ChatPageChatting
            chat={chatSelected}
            userId={userId}
            fetchMessages={fetchMessages}
            formOnSubmit={sendMessage}
          />
        }
      </div>
    );
  }
};

export default ChatPage;
