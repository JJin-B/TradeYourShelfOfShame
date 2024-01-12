import React from "react";
import BuySellBadge from "./BuySellBadge";
import Button from "./Button";

interface UserInterest {
  interestType: "sell" | "buy";
  id: string;
  name: string;
  year?: string;
}

interface Props {
  interests: UserInterest[] | undefined;
  onClickRemoveButton?: (interest: UserInterest) => void;
}

const UserTradeInterestList: React.FC<Props> = ({
  interests,
  onClickRemoveButton,
}) => {
  if (!interests || interests.length === 0) {
    return <div>No Interest List Added</div>;
  }
  return (
      <ul className="overflow-auto text-lg">
        {interests.map((interest) => (
          <li
            key={interest.id}
            className="flex justify-between items-center my-1"
          >
            <div>
              {<BuySellBadge type={interest.interestType} />} {interest.name}{" "}
              {interest.year && `(${interest.year})`}
            </div>
            {onClickRemoveButton && (
              <Button
                text="Remove"
                className="bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 mr-1"
                onClick={() => onClickRemoveButton(interest)}
              />
            )}
          </li>
        ))}
      </ul>
  );
};

export default UserTradeInterestList;
