import { useState, MouseEvent } from "react";
import XmarkIcon from "./icons/XmarkIcon";

interface PostImageProps {
  file: File;
  isMain: boolean;
  onClickXbtn: () => void;
  onClickSetMain: () => void;
}

const PostImagePreview: React.FC<PostImageProps> = ({
  file,
  isMain,
  onClickXbtn,
  onClickSetMain,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const moustEnter = () => {
    setIsHovered(true);
  };

  const moustLeave = () => {
    setIsHovered(false);
  };

  const onClickX = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClickXbtn();
  };

  return (
    <div
      className="relative mr-1"
      onMouseEnter={moustEnter}
      onMouseLeave={moustLeave}
    >
      {isMain && (
        <p className="absolute flex justify-center bg-gray-500 opacity-70 w-full top-0 cursor-pointer text-white px-2 rounded-t-lg border-t-2 border-x-2">
          Main Image
        </p>
      )}
      {isHovered && (
        <button
          className="absolute top-2 right-3 flex items-center justify-center cursor-pointer bg-white rounded-full w-4 h-4 opacity-50"
          onClick={(e) => onClickX(e)}
        >
          <XmarkIcon />
        </button>
      )}
      <img
        src={URL.createObjectURL(file)}
        className="w-36 h-36 border-2 border-gray-300 rounded-lg"
      />
      {!isMain && isHovered && (
        <p
          onClick={onClickSetMain}
          className="absolute flex justify-center bg-gray-500 opacity-70 w-full bottom-0 cursor-pointer text-white px-2 rounded-b-lg border-b-2 border-x-2 hover:opacity-90 hover:bg-gray-700"
        >
          Set Main
        </p>
      )}
    </div>
  );
};

export default PostImagePreview;
