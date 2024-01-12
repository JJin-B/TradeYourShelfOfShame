import React, { MouseEvent } from "react";
import Button from "./Button";

interface BggSearchResult {
  id: string;
  name: string;
  year?: string;
}

interface Props {
  bggToggle: boolean;
  chosenResults: BggSearchResult[];
  onButtonClick: (result: BggSearchResult, e: MouseEvent) => void;
}

const PostBggResultChosen: React.FC<Props> = ({
  bggToggle,
  chosenResults,
  onButtonClick,
}) => {


  if (bggToggle) {
    return (
      <div className="mr-2 font-medium text-gray-900 dark:text-white">
        BGG Game List
        <div
          id="dropdownUsers"
          className={`px-2 w-full z-100 border-2 border-gray-400 bg-gray-100 rounded-lg shadow w-60 dark:bg-gray-600 mb-3`}
        >
          <ul
            className="py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownUsersButton"
          >
            {chosenResults.map((result) => (
              <li key={result.id} className="my-1">
                <button className="bg-red-400 rounded-lg p-2" onClick={(e) => onButtonClick(result, e)}>Remove</button> {" "}
                <span>
                  {`${result.name}${result.year ? ` (${result.year})` : ""}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default PostBggResultChosen;
