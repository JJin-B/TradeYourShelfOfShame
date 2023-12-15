import Posting from "./components/classes/Posting";
import FrontImg from "./components/FrontImage";
import PostingPreview from "./components/PostingPreview";

interface Props {
  postings: Posting[];
}

const FrontPage: React.FC<Props> = ({ postings }) => {
  return (
    <>
      <FrontImg imgSrc={"/images/frontImage.jpg"} />
      <div className="p-5 text-3xl">
        <h1>Recent Postings..</h1>
      </div>
      <div className="flex flex-wrap justify-center mx-auto max-w-6xl">
        {postings.map((posting: Posting) => (
          <PostingPreview key={posting._id} posting={posting} />
        ))}
      </div>
    </>
  );
};

export default FrontPage;
