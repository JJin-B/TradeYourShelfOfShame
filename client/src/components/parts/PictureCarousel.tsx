import React, { useState } from "react";

interface Props {
  picUrls: string[];
}

const PictureCarousel: React.FC<Props> = ({ picUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {setCurrentIndex((prevIndex) =>prevIndex === picUrls.length - 1 ? 0 : prevIndex + 1);}; //prettier-ignore
  const prevSlide = () => {setCurrentIndex((prevIndex) =>prevIndex === 0 ? picUrls.length - 1 : prevIndex - 1);}; //prettier-ignore

  const btnClasses: string =
    "absolute top-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none";

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
    <div className="relative w-full mt-5" data-carousel="slide">
      <div className="carousel">
        <div className="carousel-inner">
          {picUrls.map((picUrl, index) => (
            <div
              key={index}
              className={`${index === currentIndex ? "active" : "hidden"}`} //prettier-ignore
            >
              <img src={picUrl} className="w-full h-96 object-cover" alt="" />
              <div className="flex items-center justify-center border rounded-lg">
                {index + 1} of {picUrls.length}
              </div>
            </div>
          ))}
        </div>
        {/* <!-- Slider controls --> */}
        {/* prettier-ignore */}
        <button className={`start-0 ${btnClasses} hover:text-opacity-10`} onClick={prevSlide}> 
          ◀
        </button>
        {/* prettier-ignore */}
        <button className={`end-0 ${btnClasses} hover:text-opacity-10`} onClick={nextSlide}>
          ▶
        </button>
      </div>
    </div>
  );
};

export default PictureCarousel;
