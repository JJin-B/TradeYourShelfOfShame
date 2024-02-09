import { useState, useEffect } from "react";

import fetchBggData from "../functions/fetchBggData";

import PostBggSearchToggle from "./PostBggSearchToggle";
import PostBggSearchBar from "./PostBggSearchBar";
import PostBggSearchResult from "./PostBggSearchResult";
import PostBggResultChosen from "./PostBggResultChosen";

import { BggData, BggItem, BggResponse } from "../classes/interfaces";
import { toast } from "react-toastify";

interface PostBggSearchProps {
  bggResultSelected: BggData[];
  addBggResultSelected: (chosenResult: BggData) => void;
  removeBggResultSelected: (chosenResult: BggData) => void;
  bggToggle?: boolean;
  handleBggToggle: () => void;
}

const PostBggSearch: React.FC<PostBggSearchProps> = ({
  bggResultSelected,
  addBggResultSelected,
  removeBggResultSelected,
  bggToggle = false,
  handleBggToggle,
}) => {
  const [bggSearchQuery, setBggSearchQuery] = useState<string>("");
  const [bggData, setBggData] = useState<BggResponse | null>(null);
  const [bggSearchResults, setBggSearchResults] = useState<BggData[]>([]);
  const [bggResultsToggle, setBggResultsToggle] = useState<boolean>(true);
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
        setBggResultsToggle(true);
      } catch {
        toast.error(`${child} has an error`, { autoClose: 3000 });
        // console.log(child, "has an error");
      }
    });
  }, [bggData]);

  const handleClickOutside = (event: MouseEvent) => {
    const dropdown = document.getElementById("dropdownUsers");
    if (dropdown && !dropdown.contains(event.target as Node)) {
      setBggResultsToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div>
      <PostBggSearchToggle bggToggle={bggToggle} onChange={handleBggToggle} />
      <PostBggSearchBar
        bggToggle={bggToggle}
        input={bggSearchQuery}
        onChangeInput={handleBggSearch}
        onClick={searchOnBgg}
      />
      {bggSearchResults.length > 0 && (
        <PostBggSearchResult
          isLoading={isLoading}
          results={bggSearchResults}
          display={bggResultsToggle}
          onClickAdd={addBggResultSelected}
        />
      )}

      <PostBggResultChosen
        bggToggle={bggToggle}
        chosenResults={bggResultSelected}
        onButtonClick={removeBggResultSelected}
      />
    </div>
  );
};

export default PostBggSearch;
