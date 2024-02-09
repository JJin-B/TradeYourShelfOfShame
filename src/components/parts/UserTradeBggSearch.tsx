import { useState, useEffect } from "react";

import fetchBggData from "../functions/fetchBggData";

import PostBggSearchBar from "./PostBggSearchBar";
import PostBggSearchResult from "./PostBggSearchResult";

import {
  BggItem,
  UserInterest,
  BggData,
  BggResponse,
} from "../classes/interfaces";

interface UserTradeBggSearchProps {
  onClickAdd: (interest: UserInterest) => void;
}

const UserTradeBggSearch: React.FC<UserTradeBggSearchProps> = ({
  onClickAdd,
}) => {
  const [bggSearchQuery, setBggSearchQuery] = useState<string>("");
  const [bggData, setBggData] = useState<BggResponse | null>(null);
  const [bggSearchResults, setBggSearchResults] = useState<BggData[]>([]);
  const [bggInterestType, setBggInterestType] = useState<"sell" | "buy">("buy");
  const [dropdownToggle, setDropdownToggle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleBggSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBggSearchQuery(e.target.value);
  };

  const searchOnBgg = async () => {
    if (bggSearchQuery) {
      setBggData(null);
      setIsLoading(true);
      const data = await fetchBggData(bggSearchQuery);
      setBggData(data);
      setIsLoading(false);
    }
  };

  const toggleDrowndown = () => {
    setDropdownToggle(!dropdownToggle);
  };

  const changeBggInterestType = (interestType: "buy" | "sell") => {
    setBggInterestType(interestType);
    setDropdownToggle(false);
  };

  useEffect(() => {
    setBggSearchResults([]);
    bggData?.children.map((child: BggItem) => {
      try {
        const newResult: BggData = {
          id: child.attributes.id,
          name: child.children[0].attributes.value,
          year: child.children[1]?.attributes.value,
        };
        setBggSearchResults((prevResults) => [...prevResults, newResult]);
      } catch {
        console.log(child, "has an error");
      }
    });
  }, [bggData]);

  return (
    <div>
      <div className="flex items-center">
        <button
          className="w-16 mx-1 mb-2 border-2 border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm h-12 flex justify-between items-center"
          type="button"
          onClick={toggleDrowndown}
        >
          <span className="pl-3">{bggInterestType.toUpperCase()}</span>{" "}
          <span>▼</span>
        </button>
        <div
          id="dropdown"
          className={`${
            !dropdownToggle && "hidden"
          } flex absolute w-16 h-16 mx-1 itmes-center justify-center border-2 border-gray-700 bg-white dark:bg-gray-600 rounded-lg text-sm`}
        >
          <ul className="text-gray-700 rounded-lg dark:text-gray-200 flex flex-col items-center justify-center">
            <li>
              <button onClick={() => changeBggInterestType("buy")}>BUY</button>
            </li>
            <li>
              <button onClick={() => changeBggInterestType("sell")}>
                SELL
              </button>
            </li>
          </ul>
        </div>

        <PostBggSearchBar
          bggToggle={true}
          input={bggSearchQuery}
          onChangeInput={handleBggSearch}
          onClick={searchOnBgg}
          classNamesToAdd="sm:w-full"
        />
      </div>
      <PostBggSearchResult
        results={bggSearchResults}
        interestType={bggInterestType}
        display={true}
        onClickAdd={onClickAdd}
        classesToAdd="border-2 border-gray-500 bg-white w-full"
        isLoading={isLoading}
      />
    </div>
  );
};

export default UserTradeBggSearch;
