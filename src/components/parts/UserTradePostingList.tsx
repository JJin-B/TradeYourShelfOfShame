import LinkedLi from "./LinkedLi";

import { PostingBggData } from "../classes/interfaces";

interface UserTradePostingListProps {
  postings: PostingBggData[];
}
const UserTradePostingList: React.FC<UserTradePostingListProps> = ({
  postings,
}) => {
  if (postings.length === 0) {
    return <span>No Trade List from Postings</span>;
  }

  return (
    <ul className="w-4/5 text-base my-1 overflow-auto">
      {postings.map((posting) => (
        <LinkedLi
          key={posting.id}
          className="hover:underline hover:cursor-pointer"
          link={`/posting/${posting.postingId}`}
          text={`- ${posting.name} (${posting.year})`}
        />
      ))}
    </ul>
  );
};

export default UserTradePostingList;
