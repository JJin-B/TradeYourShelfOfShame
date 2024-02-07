import React from "react";
import Button from "./Button";
import PostingDetailMessage from "./PostingDetailMessage";

import Posting from "../classes/Posting";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Wrapper/AuthContext";

interface Props {
  posting: Posting;
}

const PostingDetailInfo: React.FC<Props> = ({ posting }) => {
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

  const otherPostingBtnName =
    posting.author._id == user?._id
      ? "Check My Other Postings"
      : `Check ${posting.author.name}'s Other Postings`;
  const tradeListBtnName =
    posting.author._id == user?._id
      ? "Check My Trade List"
      : `Check ${posting.author.name}'s Trade List`;

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
