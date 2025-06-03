import { useNavigate } from "react-router-dom";
import { useState } from "react";

import StarIcon from "@mui/icons-material/Star";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import { ArrowRightAltSharp, Favorite } from "@mui/icons-material";

import { DeliveryIcon } from "../../../assets";
import { getRatingColor } from "../../../utils/reusable-functions";
import SizeChart from "../SizeChart";
import { Product, ProductStockItem } from "../../../utils/types";
import { clothingSizeOrder, volumeSizeRegex } from "../../../utils/constants";

const ProductPrice = ({
  productName,
  brandName,
  price,
  discount,
  averageRating,
  totalRatings,
  productRatingClick,
  addToWishlist,
  addToCart,
  isWishlisted = false,
  isAddedToCart,
  images,
  availableSize,
  relatedProductVariants,
  category,
}: {
  productName: string;
  brandName: string;
  price: number;
  discount: number;
  averageRating: number;
  totalRatings: number;
  productRatingClick?: () => void;
  addToWishlist?: () => void;
  addToCart?: () => void;
  isWishlisted?: boolean;
  isAddedToCart?: boolean;
  images: string[];
  availableSize: ProductStockItem[];
  relatedProductVariants: Product[];
  category: { id: number; name: string };
}) => {
  const navigate = useNavigate();

  const [isOpenSizeChart, setIsOpenSizeChart] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [sizeError, setSizeError] = useState<string>("");

  const has_size_chart =
    availableSize.length > 0 &&
    availableSize.every((size) => size.size_data.has_size_chart === true);

  const handleSizeChartClick = () => {
    setIsOpenSizeChart(!isOpenSizeChart);
  };

  const handleGotoProduct = (product_id: number) => {
    navigate(`/product-detail/${product_id}`);
  };

  const sortSizes = (sizes: string[]): string[] => {
    return sizes.slice().sort((a, b) => {
      if (clothingSizeOrder.includes(a) && clothingSizeOrder.includes(b)) {
        return clothingSizeOrder.indexOf(a) - clothingSizeOrder.indexOf(b);
      }

      if (volumeSizeRegex.test(a) && volumeSizeRegex.test(b)) {
        const getMlValue = (val: string): number => {
          const match = val.match(volumeSizeRegex);
          if (!match) return Infinity;
          const num = parseFloat(match[1]);
          const unit = match[2].toLowerCase();
          return unit === "ltr" || unit === "l" ? num * 1000 : num;
        };

        return getMlValue(a) - getMlValue(b);
      }

      if (!isNaN(Number(a)) && !isNaN(Number(b))) {
        return Number(a) - Number(b);
      }
      return a.localeCompare(b);
    });
  };

  const isBeautyProducts = category?.name?.toLocaleLowerCase() === "beauty";

  return (
    <div className="flex flex-col items-start">
      {/* product info */}
      <div className="mb-[12px]">
        <h2 className="font-[700] text-[24px] text-[#282c3f] m-[0px] leading-[1] text-start">
          {brandName}
        </h2>
        <h1 className="text-[#535665] font-[400] text-[20px] pt-[5px] pb-[14px] m-[0px]  opacity-[0.8]">
          {productName}
        </h1>
        {totalRatings > 0 && (
          <div
            onClick={productRatingClick}
            className="flex items-center justify-between px-[8px] py-[2px] max-w-[150px] border-1 border-solid border-[#eaeaec] cursor-pointer hover:border-[#535766]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-[700]">
                {averageRating > 0 ? averageRating.toFixed(1) : 0}
              </span>
              <StarIcon
                className={`border-r-2 border-[#eaeaec] scale-[0.7]`}
                style={{ color: getRatingColor(averageRating) }}
              />
            </div>
            <span className="text-[16px]  text-[#535766]">
              {totalRatings} Ratings
            </span>
          </div>
        )}
      </div>
      {/* end product info */}

      <hr className="border-t-[0px] w-full border-[#d2d2d2] mt-[0px]" />

      {/* product price */}
      <div className=" mt-[14px] mb-[5px] w-[270px] flex justify-between gap-1">
        <span className="font-[700] text-[#282c3f] text-[24px]">
          ₹{(price - price * (discount / 100)).toFixed(0)}
        </span>
        <span className="font-[500] text-[#535665] text-[16px] opacity-[0.6] leading-[1.2] line-through">
          MRP ₹{price}
        </span>
        <span className="font-[700] text-[#ff905a] text-[18px]">
          ({discount}% OFF)
        </span>
      </div>
      <p className="text-[#03a685]  mb-[10px]">inclusive of all taxes</p>
      {/* end product price */}

      {/* product color */}
      <div className="my-[12px]">
        {relatedProductVariants.length > 0 && (
          <>
            <div className="font-[700] text-[16px] m-[0px] text-start mb-[15px]">
              MORE {isBeautyProducts ? "OPTIONS" : "COLORS"}
            </div>
            <div className="flex gap-[15px] flex-wrap">
              {relatedProductVariants?.map((variant, index) => (
                <img
                  onClick={() => handleGotoProduct(variant.id)}
                  alt={variant.name}
                  src={variant.image[0]}
                  key={index}
                  className="h-[73px] w-[55px] hover:cursor-pointer"
                />
              ))}
            </div>
          </>
        )}
      </div>
      {/* end product color */}

      {/* product size */}
      <div className="flex gap-[30px] items-center my-[12px]">
        <div className="font-[700] text-[16px] m-[0px]">SELECT SIZE</div>
        {has_size_chart && (
          <div
            className="font-[700] text-[14px] cursor-pointer text-[#3880FF] leading-[16px] m-[0px] flex items-center"
            onClick={handleSizeChartClick}
          >
            SIZE CHART
            <NavigateNextIcon />
          </div>
        )}
      </div>

      {category?.name?.toLowerCase() === "beauty" ? (
        <div className="flex gap-[10px] mb-[10px]">
          {sortSizes(
            availableSize.map((sizeInfo) => sizeInfo.size_data.size)
          ).map((size) => {
            const sizeInfo = availableSize.find(
              (item) => item.size_data.size === size
            );
            const isSelected = sizeInfo?.size_data?.size === selectedSize;

            return (
              <div className="relative w-[85px]" key={sizeInfo?.id}>
                <button
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError("");
                  }}
                  className={`${
                    sizeInfo?.quantity === 0 ? "size-button-disabled" : ""
                  } size-button-beauty-products ${
                    isSelected ? "!border-2 !border-[#3880FF]" : ""
                  }`}
                >
                  <p
                    className={`${Number(sizeInfo?.price) <= 0 ? "p-1.5" : ""}`}
                  >
                    {size}
                  </p>
                  {Number(sizeInfo?.price) > 0 && (
                    <p className="font-normal">Rs.{sizeInfo?.price}</p>
                  )}
                </button>
                {Number(sizeInfo?.quantity) <= 0 && sizeInfo?.quantity !== 0 ? (
                  <span className="size-left-item leading-[15px]">
                    {sizeInfo?.quantity} left
                  </span>
                ) : (
                  <></>
                )}
                {Number(sizeInfo?.quantity) === 0 ? (
                  <span className="size-strike-show"></span>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex gap-[10px] mb-[10px]">
          {sortSizes(
            availableSize.map((sizeInfo) => sizeInfo.size_data.size)
          ).map((size) => {
            const sizeInfo = availableSize.find(
              (item) => item.size_data.size === size
            );
            const isSelected = sizeInfo?.size_data?.size === selectedSize;

            return (
              <div className="relative w-[50px]" key={sizeInfo?.id}>
                <button
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError("");
                  }}
                  className={`${
                    sizeInfo?.quantity === 0 ? "size-button-disabled" : ""
                  } size-button-default ${
                    isSelected ? "!border-2 !border-[#3880FF]" : ""
                  }`}
                >
                  {size}
                </button>
                {Number(sizeInfo?.quantity) <= 3 && sizeInfo?.quantity !== 0 ? (
                  <span className="size-left-item leading-[15px]">
                    {sizeInfo?.quantity} left
                  </span>
                ) : (
                  <></>
                )}
                {Number(sizeInfo?.quantity) === 0 ? (
                  <span className="size-strike-show"></span>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      )}
      {sizeError && <p className="text-red-400 text-sm mb-2">{sizeError}</p>}
      {/* product size */}

      {/* add bag and wishlist button */}
      <div className="flex gap-[10px] h-[54px] w-full mb-[23px] flex-wrap sm:flex-nowrap">
        {isAddedToCart ? (
          <button
            onClick={() => navigate("/cart")}
            className="cursor-pointer bg-[#3880FF]  w-full text-[#fff] font-bold text-[14px] rounded-[4px] flex items-center justify-center gap-[6px] hover:bg-[#3880FF] hover:border-transparent h-10"
          >
            <span>GO TO BAG</span>
            <ArrowRightAltSharp className="!w-[20px] !h-[20px]" />
          </button>
        ) : (
          <button
            onClick={() => {
              if (availableSize.length > 0 && !selectedSize) {
                setSizeError("Please select a size");
                return;
              }
              addToCart?.();
            }}
            className="cursor-pointer bg-[#3880FF] w-full text-[#fff] font-bold text-[14px] rounded-[4px] flex items-center justify-center gap-[6px] hover:bg-[#3880FF] hover:border-transparent h-10"
          >
            <ShoppingBagOutlined className="!w-[20px] !h-[20px]" />
            <span>ADD TO BAG</span>
          </button>
        )}

        <button
          onClick={addToWishlist}
          className={`h-10  ${
            isWishlisted ? "!bg-[#535766] text-[#fff]" : ""
          } cursor-pointer border border-[#d4d5d9] text-[#282c3f] bg-[#fff] font-bold text-[14px]  rounded-[4px] flex items-center justify-center gap-[6px] hover:border-[#535766] w-full`}
        >
          {isWishlisted ? (
            <Favorite
              fill="bg-[#3880FF]"
              className="text-[#3880FF] "
              style={{ fontSize: "1rem" }}
            />
          ) : (
            <FavoriteBorderIcon
              className="!w-[20px] !h-[20px]"
              style={{ fontSize: "1rem" }}
            />
          )}
          <span>WISHLIST</span>
        </button>
      </div>
      {/* end add bag and wishlist button */}

      <hr className="border-t-[0px] w-full border-[#d2d2d2] mt-[0px]" />

      {/* delivery option */}
      <div className="w-full mt-[30px]">
        <div className="font-[700] text-[16px] text-[#282c3f] m-[0px] flex items-center gap-[10px]">
          DELIVERY OPTIONS
          <img alt="" src={DeliveryIcon} className="h-[24px] w-[24px]" />
        </div>
        <form className="flex items-center border border-[#d4d5d9] rounded-[5px] overflow-hidden max-w-[280px] w-full mt-[16px] h-[43px]">
          <input
            placeholder="Enter pincode"
            className="flex-1 px-[8px] py-2 text-sm border-none focus:outline-none font-[400] text-[16px]"
            name="pincode"
          />
          <button
            // type="submit"
            className="text-sm font-medium text-[#3880FF] bg-transparent px-4 py-2 hover:bg-transparent hover:border-transparent"
          >
            Check
          </button>
        </form>
        <p className="text-start text-[13px] text-[#282c3f] mb-[20px] mt-[8px] font-[400]">
          Please enter PIN code to check delivery time & Pay on Delivery
          Availability
        </p>
        <p className="text-start text-[14px] font-[400] my-[5px]">
          100% Original Products
        </p>
        <p className="text-start text-[14px] font-[400] my-[5px]">
          Pay on delivery might be available
        </p>
        <p className="text-start text-[14px] font-[400] my-[5px]">
          Easy 14 days returns and exchanges
        </p>
      </div>
      {/* delivery option */}

      {/* Size chart */}
      {isOpenSizeChart && (
        <SizeChart
          images={images}
          sizesData={availableSize}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          handleSizeChartClick={handleSizeChartClick}
        />
      )}
    </div>
  );
};

export default ProductPrice;
