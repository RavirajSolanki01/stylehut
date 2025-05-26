import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";

export const SkeletonShopByCategory: React.FC = () => {
  return (
    <div className={`p-0.5 cursor-pointer`}>
      <div
        className={`flex justify-center items-center bg-[#f0f3f1]  max-w-[185px] cursor-pointer`}
      >
        <Box sx={{ width: 240, margin: "6px" }}>
          <Skeleton variant="rectangular" width="100%" height={180} />

          <div className="my-1">
            <p className={`font-semibold text-sm text-center capitalize`}>
              <Skeleton variant="text" width="100%" height={18} />
            </p>
            <p className={`font-extrabold text-xl text-center capitalize`}>
              <Skeleton variant="text" width="100%" height={24} />
            </p>
            <p className={`font-semibold text-sm text-center capitalize`}>
              <Skeleton variant="text" width="100%" height={18} />
            </p>
          </div>
        </Box>
      </div>
    </div>
  );
};
