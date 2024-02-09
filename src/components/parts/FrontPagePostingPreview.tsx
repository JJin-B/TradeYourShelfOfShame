import Posting from "../classes/Posting";
import BuySellBadge from "./BuySellBadge";
import { Link } from "react-router-dom";
import { truncateText } from "../functions/utils";

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = "/images/noImage.jpg";
};

const getPreviewImgSrc = (imgSrc: string) => {
  const src = imgSrc ? imgSrc : "";

  return src;
};

interface FrontPostingPreviewProps {
  posting: Posting;
}

const FrontPagePostingPreview: React.FC<FrontPostingPreviewProps> = ({
  posting,
}) => {
  const frontImgSrc = getPreviewImgSrc(posting.imageSrc[0]);

  return (
    <div
      key={posting._id}
      className="m-3 w-60 h-96 inline-block max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <Link to={`/posting/${posting._id}`}>
        <img
          className="rounded-t-lg w-full h-48 object-cover"
          src={frontImgSrc}
          // src={posting.imageSrc[0]}
          alt=""
          onError={handleImageError}
        />
      </Link>
      <div className="p-5">
        <Link to={`/posting/${posting._id}`}>
          <BuySellBadge type={posting.type} />
          <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {truncateText(posting.title, 20)} {/* Limit to 20 characters */}
          </span>
        </Link>
        <Link to={`/posting/${posting._id}`}>
          <p className="mb-3 font-normal break-words  text-gray-700 dark:text-gray-400">
            {truncateText(posting.desc, 60)} {/* Limit to 60 characters */}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default FrontPagePostingPreview;
