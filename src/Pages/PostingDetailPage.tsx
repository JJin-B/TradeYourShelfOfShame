import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Posting from "../components/classes/Posting";
import PictureCarousel from "../components/parts/PictureCarousel";
import Button from "../components/parts/Button";
import BuySellBadge from "../components/parts/BuySellBadge";

import { useParams } from "react-router-dom";

import { apiAddress, useAuth } from "../Wrapper/AuthContext";
import PostingDetailMessage from "../components/parts/PostingDetailMessage";

interface Props {}

const PostingDetailPage: React.FC<Props> = () => {
  const navigate = useNavigate();

  const [posting, setPosting] = useState<Posting>();

  const { postId } = useParams<{ postId: string }>();
  const { user } = useAuth();

  const fetchUrl = apiAddress + `/posting/${postId}`;

  const otherPostingOnClick = () => {
    navigate(`/search?author=${posting?.author._id}`);
  };

  const tradeListOnClick = () => {
    navigate(`/trade/${posting?.author._id}`);
  };

  useEffect(() => {
    fetch(fetchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the posting");
        }
        return response.json();
      })
      .then((data) => {
        setPosting(data);
      })
      .catch((error) => {
        console.error("Error fetching the posting:", error);
      });
  }, [fetchUrl]);

  if (!posting) {
    // Handle the case where the posting is not found
    return <div>Posting not found!</div>;
  }

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
    <>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex items-start justify-center m-3 w-full flex-col text-3xl max-w-2xl break-words ">
            {<BuySellBadge type={posting.type} />}
            {posting.title}
            <PictureCarousel picUrls={posting.imageSrc} />
          </div>
          <div className="w-full ml-0 sm:w-96 sm:ml-10 text-xl max-w-sm break-words border border-solid border-grey-700 p-4 mt-10 ">
            <div>Price: ${posting.price}</div>
            <div>Location : {posting.location}</div>
            <div>Posted On : {formattedDate}</div>
            <div>Created By : {posting.author.name}</div>
            <div className="my-3">
              <Button
                text={otherPostingBtnName}
                onClick={otherPostingOnClick}
              />
            </div>
            <div className="my-3">
              <Button text={tradeListBtnName} onClick={tradeListOnClick} />
            </div>
            {posting.author._id != user?._id && (
              <PostingDetailMessage posting={posting} />
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto h-18 p-3 min-h-fit max-w-6xl m-10 dark:border dark:border-grey-700 overflow-auto rounded-md">
        <h1 className="text-2xl">Related BGG Games</h1>
        {posting.bggData.map((bgg) => (
          <li key={bgg.id} className="hover:underline hover:text-blue-500">
            <a href={`https://boardgamegeek.com/boardgame/${bgg.id}}`} target="_blank">
              {bgg.name}
            </a>
          </li>
        ))}
      </div>

      <div className="mx-auto h-64 p-3 min-h-fit max-w-6xl m-10 dark:border dark:border-grey-700 rounded-md">
        <h1 className="text-2xl">Description</h1>
        <p className="mt-5">{posting.desc}</p>
      </div>
    </>
  );
};

export default PostingDetailPage;
