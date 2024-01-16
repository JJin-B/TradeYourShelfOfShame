import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";
import BuySellBadge from "./BuySellBadge";
import axios from "axios";
import { apiAddress, useAuth } from "../../Wrapper/AuthContext";

interface PostingNotification {
  postingId: { _id: string; title: string; type: "sell" | "buy" };
  isViewed: string;
}

interface Props {
  notifications: PostingNotification[];
  userId: string;
}

const NavBarNotifications: React.FC<Props> = ({ userId, notifications }) => {
  const navigate = useNavigate();

  const { signin } = useAuth();
  const [notyDropdownToggle, setNotyDropdownToggle] = useState<boolean>(false);
  const [notyCount, setNotyCount] = useState<number>(0);

  useEffect(() => {
    const cnt = notifications.filter((noty) => !noty.isViewed).length;
    setNotyCount(cnt);
  }, []);

  const bellOnClick = () => {
    if (notifications.length > 0) {
      setNotyDropdownToggle(!notyDropdownToggle);
    }
    if (notyCount > 0) {
      const fetchUrl = apiAddress + "/user/" + userId + "/checkNotification";
      axios
        .patch(fetchUrl)
        .then((res) => {
          if (res.data) {
            signin(res.data);
          }
        })
        .catch((e) => console.log(e));
    }
  };

  // const onClickOutside = () => {
  //   setNotyDropdownToggle(false);
  // };

  const notyOnClick = (postingId: string) => {
    navigate(`/posting/${postingId}`);
    setNotyDropdownToggle(false);
  };

  return (
    <div className="relative flex items-center">
      <NotificationBell count={notyCount} onClick={bellOnClick} />
      <div
        className={`${
          !notyDropdownToggle && "hidden"
        } absolute w-96 right-0 top-10 z-50 bg-gray-300 rounded-lg max-h-96 p-2 overflow-auto border-2 border-gray-700`}
      >
        <ul>
          {notifications.map((notification) => (
            <li
              className={`${
                !notification.isViewed && "bg-gray-400"
              } rounded-md my-2 border border-gray-500 p-2`}
              key={notification.postingId._id}
            >
              <button onClick={() => notyOnClick(notification.postingId._id)}>
                <BuySellBadge type={notification.postingId.type} />
                {` ${notification.postingId.title}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBarNotifications;