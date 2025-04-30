import React from "react";
import Skeleton from "@mui/material/Skeleton";

export const SkeletonProduct: React.FC = () => {
  return (
    <div className="max-w-[210px] mx-[10px] mb-[20px] w-auto">
      {/* Image skeleton */}
      <div className="relative w-[210px] h-[280px] overflow-hidden">
        <Skeleton variant="rectangular" width={210} height={280} />
      </div>

      {/* Rating bar skeleton */}
      <div className="px-[10px] mt-[8px]">
        <Skeleton variant="text" width={60} height={20} />
      </div>

      {/* Name skeleton */}
      <div className="px-[10px] mt-[12px]">
        <Skeleton variant="text" width={180} height={24} />
      </div>

      {/* Brand skeleton */}
      <div className="px-[10px] mt-[6px]">
        <Skeleton variant="text" width={120} height={20} />
      </div>

      {/* Price line skeleton */}
      <div className="px-[10px] mt-[6px]">
        <Skeleton variant="text" width={160} height={20} />
      </div>

      {/* Wishlist button skeleton */}
      <div className="px-[10px] mt-[8px]">
        <Skeleton variant="rectangular" width={190} height={32} />
      </div>
    </div>
  );
};
