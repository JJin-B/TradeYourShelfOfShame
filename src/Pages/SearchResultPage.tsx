import React from "react";
import { useLocation } from "react-router-dom";

import Posting from "../components/classes/Posting";
import SearchPagePostingPreview from "../components/SearchPagePostingPreview";

interface Props {
  postings: Posting[];
}
const ComponentName: React.FC<Props> = ({ postings }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const typeParam = queryParams.get("type")?.toLocaleLowerCase();
  const searchInput = queryParams.get("input")?.toLocaleLowerCase();

  let postingsToDisply: Posting[] = [];

  if (searchInput) {
    postingsToDisply = postings.filter((p) =>
      p.title.toLocaleLowerCase().includes(searchInput)
    );
  } else {
    postingsToDisply = postings;
  }

  if (typeParam) {
    postingsToDisply = postingsToDisply.filter((p) => p.type === typeParam);
  } else {
    postingsToDisply = postingsToDisply;
  }

  if (postingsToDisply.length > 0) {
    return (
      <div className="justify-center mx-auto max-w-6xl">
        {postingsToDisply.map((posting) => (
          <SearchPagePostingPreview key={posting._id} posting={posting} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="justify-center mx-auto max-w-6xl">NO POSTINGS FOIND</div>
    );
  }
};

export default ComponentName;
