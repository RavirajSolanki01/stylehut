import React from "react";

const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-[1600px] mx-auto p-[28px] animate-pulse">
      {/* Breadcrumbs skeleton */}
      <div className="flex gap-2 mb-6">
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <div key={idx} className="w-16 h-4 bg-gray-300 rounded" />
          ))}
      </div>

      {/* Main layout: grid of 5 columns */}
      <div className="grid grid-cols-5 gap-4">
        {/* Left: Product Images */}
        <div className="col-span-12 md:col-span-3 mr-[26px]">
          <div className="flex gap-4">
            <div className="w-1/2 h-[500px] bg-gray-300 rounded-md" />
            <div className="w-1/2 h-[500px] bg-gray-300 rounded-md" />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="col-span-12 md:col-span-2 space-y-4">
          <div className="h-6 bg-gray-300 w-2/3 rounded" /> {/* Product Name */}
          <div className="h-4 bg-gray-300 w-1/3 rounded" /> {/* Brand */}
          <div className="h-6 bg-gray-300 w-1/2 rounded" /> {/* Price */}
          <div className="h-4 bg-gray-300 w-1/4 rounded" /> {/* Rating */}
          <div className="h-10 bg-gray-300 w-full rounded" />{" "}
          {/* Add to Wishlist */}
          <div className="h-10 bg-gray-300 w-full rounded" />{" "}
          {/* Add to Cart */}
          <hr className="border-t border-gray-300" />
          {/* Best Offers */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 w-1/2 rounded" />
            <div className="h-4 bg-gray-300 w-3/4 rounded" />
            <div className="h-4 bg-gray-300 w-2/3 rounded" />
          </div>
          <hr className="border-t border-gray-300" />
          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 w-3/4 rounded" />
            <div className="h-4 bg-gray-300 w-full rounded" />
            <div className="h-4 bg-gray-300 w-5/6 rounded" />
          </div>
          <hr className="border-t border-gray-300" />
          {/* Ratings Distribution */}
          <div className="space-y-2">
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="h-4 bg-gray-300 w-full rounded" />
              ))}
          </div>
          <hr className="border-t border-gray-300" />
          {/* Customer Reviews */}
          <div className="space-y-4">
            {Array(2)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="h-4 bg-gray-300 w-1/3 rounded" />
                  <div className="h-3 bg-gray-300 w-full rounded" />
                  <div className="h-3 bg-gray-300 w-5/6 rounded" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
