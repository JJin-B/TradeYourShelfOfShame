import Button from "./Button";
import PostingDetailMessage from "./PostingDetailMessage";

import Posting from "../classes/Posting";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Wrapper/AuthContext";

const getBtnNames = (
  authorId: string,
  userId: undefined | string,
  authorName: string
) => {
  const otherPostingBtnName =
    authorId == userId
      ? "Check My Other Postings"
      : `Check ${authorName}'s Other Postings`;
  const tradeListBtnName =
    authorId == userId
      ? "Check My Trade List"
      : `Check ${authorName}'s Trade List`;

  return { otherPostingBtnName, tradeListBtnName };
};

interface PostingDetailInfoProps {
  posting: Posting;
}

const PostingDetailInfo: React.FC<PostingDetailInfoProps> = ({ posting }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const otherPostingOnClick = () => {
    navigate(`/search?author=${posting?.author._id}`);
  };

  const tradeListOnClick = () => {
    navigate(`/trade/${posting?.author._id}`);
  };

  const createdAtDate = new Date(posting.createdAt);

  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const { otherPostingBtnName, tradeListBtnName } = getBtnNames(
    posting.author._id,
    user?._id,
    posting.author.name
  );

  return (
    <div className="w-full ml-0 sm:w-96 sm:ml-10 text-xl max-w-sm break-words border border-solid border-grey-700 p-4 mt-10 ">
      <div>Price: ${posting.price}</div>
      <div>Location : {posting.location}</div>
      <div>Posted On : {formattedDate}</div>
      <div>Created By : {posting.author.name}</div>
      <div className="my-3">
        <Button text={otherPostingBtnName} onClick={otherPostingOnClick} />
      </div>
      <div className="my-3">
        <Button text={tradeListBtnName} onClick={tradeListOnClick} />
      </div>
      {posting.author._id != user?._id && (
        <PostingDetailMessage posting={posting} />
      )}
    </div>
  );
};

export default PostingDetailInfo;
