import React, { useState, useEffect, useRef } from "react";
import { Star, FavoriteBorder, Favorite } from "@mui/icons-material";

interface ProductCardProps {
  imageUrl: string;
  brand: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating?: number;
  additionalImages?: string[]; // Array of additional images for carousel
  addToWishlist?: () => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  brand,
  name,
  price,
  originalPrice,
  discount,
  rating = 0,
  additionalImages = [], // Default to empty array if not provided
  addToWishlist,
  isWishlisted = false,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const allImages = [imageUrl, imageUrl, ...additionalImages];

  useEffect(() => {
    if (isHovered && allImages.length > 1) {
      timerRef.current = setInterval(() => {
        setSlideDirection("left");
        setCurrentImageIndex((prevIndex) =>
          prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setCurrentImageIndex(0);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovered, allImages.length]);

  return (
    <div
      className="max-w-[210px] mx-[10px] mb-[20px] w-auto hover:shadow-lg cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <div className="relative w-[210px] h-[280px]">
          {allImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={name}
              className={`absolute w-full h-full object-cover transition-transform duration-500 ${
                index === currentImageIndex
                  ? "translate-x-0"
                  : index < currentImageIndex
                  ? "-translate-x-full"
                  : "translate-x-full"
              }`}
            />
          ))}
        </div>
        <div className="absolute bottom-2 left-2 bg-[hsla(0,0%,100%,.8)] text-black px-2 py-1 rounded-sm flex items-center gap-1 group-hover:hidden">
          <span className="text-xs font-medium">{rating.toFixed(1)}</span>
          <Star className="text-[#72BFBC]" style={{ fontSize: "1rem" }} />
          <span className="text-xs font-medium">|</span>
          <span className="text-xs font-medium">23</span>
        </div>
      </div>

      <div className="relative group-hover:block hidden">
        <div className="absolute top-[-13px] left-0 w-full h-full bg-white z-[50] bg-opacity-100">
          <div className="bg-white p-1">
            <div className="flex gap-1 justify-center">
              {allImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                    index === currentImageIndex ? "bg-[#ff3e6c]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text-left text-[#535766] px-[10px] mb-[5px] group-hover:block hidden">
        <button
          onClick={(e) => {
            e.stopPropagation(); // <-- This prevents the parent onClick
            addToWishlist?.(); // <-- Call your wishlist function
          }}
          className={`cursor-pointer ${
            isWishlisted ? "!bg-[#535766] text-[#fff]" : ""
          } default !rounded-sm text-[#535766] text-[12px] w-full bg-white flex items-center justify-center gap-2 !border border-gray-300 hover:!border-black transition-colors py-1`}
        >
          {isWishlisted ? (
            <Favorite
              fill="bg-[#ff3e6c]"
              className="text-[#ff3e6c] "
              style={{ fontSize: "1rem" }}
            />
          ) : (
            <FavoriteBorder
              className="text-[#535766] "
              style={{ fontSize: "1rem" }}
            />
          )}
          Wishlist
        </button>
        <span>Sizes: L</span>
      </div>

      <div className="text-left text-[16px] text-[700] px-[10px] mt-[12px] mb-[6px] group-hover:hidden">
        {name}
      </div>
      <div className="text-left text-[14px] text-[#535766] px-[10px] mb-[6px] group-hover:hidden">
        {brand}
      </div>
      <div className="text-left text-[14px] text-[#000] px-[10px]">
        Rs.{price}
        <span className="line-through text-[#7e818c] text-[12px] mx-[5px]">
          Rs. {originalPrice}
        </span>
        <span className="text-[#ff905a] text-[12px]"> ({discount}% OFF)</span>
      </div>
    </div>
  );
};
