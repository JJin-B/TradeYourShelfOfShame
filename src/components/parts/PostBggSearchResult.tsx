import React from "react";
import LinkedLi from "./LinkedLi";

interface BggSearchResult {
  id: string;
  name: string;
  year?: string;
}

interface Props {
  results: BggSearchResult[];
  display: boolean;
  onClick: (result: BggSearchResult) => void;
}

const PostBggSearchResult: React.FC<Props> = ({ results, display, onClick }) => {
  const className =
    "flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";

  return (
    <div
      id="dropdownUsers"
      className={`${
        !display && "hidden"
      } w-96 z-100 border bg-gray-200 rounded-lg shadow dark:bg-gray-700 mb-3`}
    >
      <ul
        className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownUsersButton"
      >
        {results.map((result) => (
          <LinkedLi
            key={result.id}
            className={className}
            text={`${result.name}${result.year ? ` (${result.year})` : ""}`}
            onClick={() => onClick(result)}
          />
        ))}
      </ul>
    </div>
  );
};

export default PostBggSearchResult;
