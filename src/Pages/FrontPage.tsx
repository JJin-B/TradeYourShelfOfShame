import Posting from "../components/classes/Posting";
import FrontImg from "../components/FrontImage";
import FrontPagePostingPreview from "../components/FrontPagePostingPreview";

interface Props {
  postings: Posting[];
}

const FrontPage: React.FC<Props> = ({ postings }) => {
  return (
    <>
      <FrontImg imgSrc={"/images/frontImage.jpg"} />
      <div className="p-5 text-3xl flex flex-wrap mx-auto max-w-6xl">
        <h1>Recent Postings..</h1>
      </div>
      <div className="flex flex-wrap justify-center mx-auto max-w-6xl">
        {postings.slice(0, 8).map((posting: Posting) => (
          <FrontPagePostingPreview key={posting._id} posting={posting} />
        ))}
      </div>
    </>
  );
};

export default FrontPage;
