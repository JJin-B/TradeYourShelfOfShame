import { useState } from "react";

const btnClasses: string =
  "absolute top-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none bg-transparent";

interface PicCarouselProps {
  picUrls: string[];
}

const PictureCarousel: React.FC<PicCarouselProps> = ({ picUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {setCurrentIndex((prevIndex) =>prevIndex === picUrls.length - 1 ? 0 : prevIndex + 1);}; //prettier-ignore
  const prevSlide = () => {setCurrentIndex((prevIndex) =>prevIndex === 0 ? picUrls.length - 1 : prevIndex - 1);}; //prettier-ignore

  if (picUrls.length === 0) {
    return (
      <div className="relative w-full mt-5" data-carousel="slide">
        <div className="carousel">
          <div className="carousel-inner">
            <img
              src="/images/noImage.jpg"
              className="w-full h-96 object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full mt-5 carousel px-1 mx-1"
      data-carousel="slide"
    >
      <div className="carousel-inner">
        {picUrls.map((picUrl, index) => (
          <div
            key={index}
            className={`${index === currentIndex ? "active" : "hidden"}`} //prettier-ignore
          >
            <div className="flex items-center justify-center ">
              <img src={picUrl} className="h-96" alt="" />
            </div>
            <div className="flex items-center justify-center border rounded-lg">
              {index + 1} of {picUrls.length}
            </div>
          </div>
        ))}
      </div>
      <button
        className={`start-0 ${btnClasses} hover:text-opacity-10`}
        onClick={prevSlide}
      >
        ◀
      </button>
      <button
        className={`end-0 ${btnClasses} hover:text-opacity-10`}
        onClick={nextSlide}
      >
        ▶
      </button>
    </div>
  );
};

export default PictureCarousel;
