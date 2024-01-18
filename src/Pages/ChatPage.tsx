import React from "react";
import { useState, useEffect } from "react";
import { apiAddress } from "../Wrapper/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import ChatPageChats from "../components/parts/ChatPageChats";
import { toast } from "react-toastify";
import axios, { AxiosResponse } from "axios";

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
  const navigator = useNavigate();
  const location = useLocation();

  const [chatId, setChatId] = useState<String>("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [displayChats, setDisplayChats] = useState<Chat[]>([]);
  const [displayOption, setDisplayOption] = useState<"all" | "new" | "my">(
    "all"
  );

  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    setChatId(queryParams.get("messageId")?.toLowerCase() || "");

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
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);

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

  const displayOptionClass = `p-2 border border-gray-400 rounded-md bg-gray-200`;

  const displayOptionOnClick = (option: "all" | "new" | "my") => {
    setDisplayOption(option);
  };

  return (
    <div className="mx-auto max-w-4xl ">
      <div className="m-3 rounded-sm flex items-center h-14">
        <button
          className={displayOptionClass}
          onClick={() => displayOptionOnClick("all")}
        >
          All Messages
        </button>
        <button
          className={displayOptionClass}
          onClick={() => displayOptionOnClick("new")}
        >
          New Messages
        </button>
        <button
          className={displayOptionClass}
          onClick={() => displayOptionOnClick("my")}
        >
          My Postings
        </button>
      </div>

      <div className="border border-2 rounded-md h-[720px] my-2 overflow-auto">
        {displayChats ? (
          <ChatPageChats chats={displayChats} userId={userId} />
        ) : (
          <div className="flex justify-center text-xl p-3">
            There are no chats
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
