import React from "react";
import LinkedLi from "./LinkedLi";
import Button from "./Button";

interface BggSearchResult {
  id: string;
  name: string;
  year?: string;
}

interface UserInterest {
  interestType: "sell" | "buy";
  id: string;
  name: string;
  year?: string;
}

interface Props {
  results: BggSearchResult[];
  display: boolean;
  onClickAdd: (result: UserInterest) => void;
  classesToAdd?: string;
  interestType?: "buy" | "sell";
  isLoading: boolean;
}

const PostBggSearchResult: React.FC<Props> = ({
  results,
  display,
  onClickAdd,
  classesToAdd,
  interestType,
  isLoading
}) => {
  const onClick = (result: BggSearchResult) => {
    const interest: UserInterest = {
      interestType: interestType ? interestType : "buy",
      id: result.id,
      name: result.name,
      year: result.year,
    };
    onClickAdd(interest);
  };

  const className =
    "flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";

  return (
    <div
      id="dropdownUsers"
      className={`${
        !display && "hidden"
      } text-lg w-96 z-100 border rounded-lg shadow bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 mb-3 ${classesToAdd}`}
    >{isLoading && <div className="flex items-center justify-center">Loading...</div>}
      <ul
        className="h-48 py-2 overflow-y-auto"
        aria-labelledby="dropdownUsersButton"
      >
        {results.map((result) => (
          <div className="flex justify-between" key={result.id}>
            <LinkedLi
              className={className}
              text={`${result.name}${result.year ? ` (${result.year})` : ""}`}
            />
            <Button
              text="Add"
              className="my-1"
              onClick={() => onClick(result)}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PostBggSearchResult;
