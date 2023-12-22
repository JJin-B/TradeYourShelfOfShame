import React, { useState } from "react";
import fetchBggData from "../functions/fetchBggData";
import PostBggSearchInput from "./PostBggSearchInput";
import PostBggSearchBtn from "./PostBggSearchBtn";

interface Props {}

interface BggItem {
  name: { type: string; value: string };
  yearpublished: { value: string };
}

interface BggResponse {
  items: { item: BggItem[] };
}

const PostBggSearch: React.FC<Props> = () => {
  const [bggSearchQuery, setBggSearchQuery] = useState<string>();
  const [bggToggle, setBggToggle] = useState<boolean>(false);
  const [bggData, setBggData] = useState<BggResponse | null>();

  const handleBggToggle = () => {
    setBggToggle(!bggToggle);
  };

  const handleBggSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBggSearchQuery(e.target.value);
  };

  const searchOnBgg = async () => {
    if (bggSearchQuery) {
      const data = await fetchBggData(bggSearchQuery);
      setBggData(data);
    }
  };

  return (
    <div>
      <PostBggSearchInput bggToggle={bggToggle} onChange={handleBggToggle} />
      <PostBggSearchBtn
        bggToggle={bggToggle}
        onChangeInput={handleBggSearch}
        onClick={searchOnBgg}
      />

    </div>
  );
};

export default PostBggSearch;
