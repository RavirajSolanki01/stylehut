import React, { useEffect, useState } from "react";
import { Slide1, Slide2, Slide3, Slide4 } from "../../assets";

export const HomePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [Slide1, Slide2, Slide3, Slide4];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length, 3000]);
  return (
    <div>
      <div className="flex justify-center items-center overflow-visible">
        <div className="pt-[115px] w-full responsive-home-page">
          <div className="relative w-full h-full mx-auto overflow-hidden">
            <div className="w-full h-full">
              <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className="flex w-full h-full transition-transform duration-800 ease-in-out"
                style={{ transform: `translateX(-${currentIndex}%)` }}
              />
            </div>

            <div className="flex justify-center gap-[10px]">
              {images.map((_, index) => (
                <button
                  title="b"
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={ `w-full max-w-[1px] p-[3px] mt-[10px] h-full max-h-[1px] rounded-[50%] hover:border-transparent focus:outline-none focus:border-transparent ${
                    index === currentIndex
                      ? "bg-[#83838f] border border-[#83838f]"
                      : "bg-[#d7d7d7] border border-[#efefef]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
