import React from "react";
import Posting from "../classes/Posting";
import BuySellBadge from "./BuySellBadge";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import DeleteButton from "./DeleteButton";
import { useAuth } from "../../Wrapper/AuthContext";

interface Props {
  posting: Posting;
}

const SearchPagePostingPreview: React.FC<Props> = ({ posting }) => {
  const navigate = useNavigate();

  const { user } = useAuth();

  // Function to truncate text to a specified number of characters
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  //prettier-ignore
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Replace the source with a placeholder image or set a default image source
    e.currentTarget.src = '/images/noImage.jpg';
  };

  const createdAtDate = new Date(posting.createdAt);
  const year = createdAtDate.getFullYear();
  const month = (createdAtDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed, so we add 1
  const day = createdAtDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const editOnClick = () => {
    navigate(`/posting/${posting._id}/edit`);
  };

  return (
    <div className="m-3 max-w-6xl flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row mhover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="w-72 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
        <Link to={`/posting/${posting._id}`}>
          <img
            className="rounded-lg h-60"
            src={posting.imageSrc[0] ? posting.imageSrc[0] : ""}
            alt=""
            onError={handleImageError}
          />
        </Link>
      </div>
      <div className="flex justify-between p-4 leading-normal w-4/5 text-gray-900 dark:text-white">
        <div className="flex-col">
          <Link to={`/posting/${posting._id}`}>
            <BuySellBadge type={posting.type} />
            <span className="text-2xl font-normal">${posting.price}</span>
            <h5 className="mb-2 text-3xl font-bold tracking-tight">
              {posting.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {truncateText(posting.desc, 100)}
            </p>
            <p>
              <span className="text-gray-700 dark:text-gray-300">
                Location:{" "}
              </span>
              {posting.location}
            </p>
            <p>
              <span className="text-gray-700 dark:text-gray-300">
                Posted On:{" "}
              </span>
              {formattedDate}
            </p>
          </Link>
        </div>
        {user && user._id === posting.author._id && (
          <div>
            <Button className="m-1 w-24 bg-blue-400" text="Edit" onClick={editOnClick} />
            <DeleteButton posting_id={posting._id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPagePostingPreview;
