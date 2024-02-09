import { useEffect, useState } from "react";

import Posting from "../components/classes/Posting";
import PictureCarousel from "../components/parts/PictureCarousel";

import { useParams } from "react-router-dom";

import { apiAddress } from "../Wrapper/AuthContext";
import PostingDetailsRelatedBggGames from "../components/parts/PostingDetailsRelatedBggGames";
import PostingDetailTitle from "../components/parts/PostingDetailTitle";
import PostingDetailInfo from "../components/parts/PostingDetailInfo";
import PostingDetailDesc from "../components/parts/PostingDetailDesc";

const PostingDetailPage: React.FC = () => {
  const [posting, setPosting] = useState<Posting>();

  const { postId } = useParams<{ postId: string }>();

  const fetchUrl = apiAddress + `/posting/${postId}`;

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
    return <div>Posting not found!</div>;
  }

  return (
    <>
      <PostingDetailTitle title={posting.title} type={posting.type} />

      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-center">
        <PictureCarousel picUrls={posting.imageSrc} />
        <PostingDetailInfo posting={posting} />
      </div>

      {posting.bggData.length > 0 && (
        <PostingDetailsRelatedBggGames posting={posting} />
      )}

      <PostingDetailDesc desc={posting.desc} />
    </>
  );
};

export default PostingDetailPage;
