import React from "react";

interface Props {
  url: string;
}

const Picture: React.FC<Props> = ({ url }) => {
  
  return (
    <div className="hidden duration-700 ease-in-out" data-carousel-item>
      <img
        src={url}
        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        alt="..."
      />
    </div>
  );
};

export default Picture;
