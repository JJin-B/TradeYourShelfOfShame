
interface FrontImgProps {
  imgSrc: string;
}

const FrontImage: React.FC<FrontImgProps> = ({ imgSrc }) => {
  const imageStyle: React.CSSProperties = {
    maxHeight: "50vh", 
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
