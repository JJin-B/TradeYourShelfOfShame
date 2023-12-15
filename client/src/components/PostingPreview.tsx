import React from "react";
import Posting from "./classes/Posting";
import { Link } from "react-router-dom";

interface Props {
  posting: Posting;
}

const PostingPreview: React.FC<Props> = ({ posting }) => {
  // Function to truncate text to a specified number of characters
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  //prettier-ignore
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Replace the source with a placeholder image or set a default image source
    e.currentTarget.src = '/images/noImage.jpg';
  };

  const postingClasses: string =
    "m-3 w-60 h-96 inline-block max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700";

  return (
    <div key={posting._id} className={postingClasses}>
      <Link to={`/posting/${posting._id}`}>
        <img
          className="rounded-t-lg w-full h-48 object-cover"
          src={posting.imageSrc[0] ? posting.imageSrc[0] : ""}
          alt=""
          onError={handleImageError}
        />
      </Link>
      <div className="p-5">
        <Link to={`/posting/${posting._id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {truncateText(posting.title, 30)} {/* Limit to 30 characters */}
          </h5>
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

export default PostingPreview;
