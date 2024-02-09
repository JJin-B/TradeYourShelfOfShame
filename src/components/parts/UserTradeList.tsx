import UserTradePostingList from "./UserTradePostingList";
import UserTradeInterestList from "./UserTradeInterestList";

import { PostingBggData, UserInfo } from "../classes/interfaces";

const getTitle = (type: "buy" | "sell") => {
  return type === "buy" ? "I Am Looking For ..." : "I Am Offering ...";
};
const getStyle = (type: "buy" | "sell") => {
  const color = type === "buy" ? "blue" : "red";
  const colorBorder = color === "blue" ? `${color}-700` : `${color}-500`;
  const styleClass = `text-md flex flex-col items-center border border-2 border-${colorBorder} rounded-lg w-2/5  max-w-[600px] min-w-[280px] h-64 m-2 p-1 bg-gray-100 dark:bg-gray-500`;

  return { color, styleClass };
};

interface UserTradeListProps {
  type: "buy" | "sell";
  postings: PostingBggData[];
  user: UserInfo;
}

const UserTradeList: React.FC<UserTradeListProps> = ({
  type,
  postings,
  user,
}) => {
  const title = getTitle(type);
  const { color, styleClass } = getStyle(type);

  return (
    <div className="flex flex-col items-center w-full">
      <span
        className={`flex justify-center mx-1 text-lg font-bold rounded-md p-2 w-full bg-${color}-400 text-gray-900`}
      >
        {title}
      </span>
      <div className="flex flex-wrap justify-center w-full">
        <div className={styleClass}>
          <span className="border-b-2 mb-2">List from Postings</span>
          <UserTradePostingList postings={postings} />
        </div>
        <div className={styleClass}>
          <span className="border-b-2 mb-2">Interest List</span>
          <UserTradeInterestList
            interests={user.interests?.filter(
              (interest) => interest.interestType === "buy"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default UserTradeList;
