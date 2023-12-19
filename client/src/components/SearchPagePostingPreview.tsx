import React from "react";
import Posting from "./classes/Posting";
import BuySellBadge from "./parts/BuySellBadge";
import { Link } from "react-router-dom";

interface Props {
  posting: Posting;
}

const SearchPagePostingPreview: React.FC<Props> = ({ posting }) => {
  // Function to truncate text to a specified number of characters
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  //prettier-ignore
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Replace the source with a placeholder image or set a default image source
    e.currentTarget.src = '/images/noImage.jpg';
  };

  return (
    <Link to={`/posting/${posting._id}`}>
      <div className="m-3 max-w-6xl flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row mhover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover rounded-lg w-72 h-60"
          src={posting.imageSrc[0] ? posting.imageSrc[0] : ""}
          alt=""
          onError={handleImageError}
        />
        <div className="flex flex-col justify-between p-4 leading-normal w-4/5 text-gray-900 dark:text-white">
          <BuySellBadge type={posting.type} />
          <span className="text-xl">${posting.price}</span>
          <h5 className="mb-2 text-3xl font-bold tracking-tight">
            {posting.title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {truncateText(posting.desc, 100)}
          </p>
          <p>Location:</p>
          <p>Posted On:</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchPagePostingPreview;
