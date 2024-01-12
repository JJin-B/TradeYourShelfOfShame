import React from "react";
import LinkedLi from "./LinkedLi";

interface BggData {
  id: string;
  name: string;
  year?: string;
}

interface PostingBggData extends BggData {
  type: "sell" | "buy";
  postingId: string;
}

interface Props {
  postings: PostingBggData[];
}
const UserTradePostingList: React.FC<Props> = ({ postings }) => {
  if (postings.length === 0) {
    return <span>No Trade List from Postings</span>;
  }

  const liClasses =
    "w-4/5 text-base my-1 overflow-auto";

  return (
    <ul className={liClasses}>
      {postings.map((posting) => (
        <LinkedLi
          key={posting.id}
          className="hover:underline"
          link={`/posting/${posting.postingId}`}
          text={`- ${posting.name} (${posting.year})`}
        />
      ))}
    </ul>
  );
};

export default UserTradePostingList;
