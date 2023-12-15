import React from "react";

interface Props {
  imgSrc: string;
}

const FrontImage: React.FC<Props> = ({ imgSrc }) => {
  const imageStyle: React.CSSProperties = {
    maxHeight: "50vh", // 30% of the viewport height
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <img
      src={imgSrc}
      style={imageStyle}
      className="object-cover"
      alt="FrontImage"
    />
  );
};

export default FrontImage;
