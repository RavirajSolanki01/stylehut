import StarIcon from "@mui/icons-material/Star";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { PRODUCT_DETAIL_CONSTANTS } from "../../../utils/constants";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import { DeliveryIcon } from "../../../assets";
import { getRatingColor } from "../../../utils/reusable-functions";
import { Favorite } from "@mui/icons-material";

const ProductPrice = ({
  productName,
  brandName,
  price,
  discount,
  averageRating,
  totalRatings,
  productRatingClick,
  addToWishlist,
  isWishlisted = false,
}: {
  productName: string;
  brandName: string;
  price: number;
  discount: number;
  averageRating: number;
  totalRatings: number;
  productRatingClick?: () => void;
  addToWishlist?: () => void;
  isWishlisted?: boolean;
}) => {
  return (
    <div className="flex items-center flex-col items-start">
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
              <span className="text-[16px] font-[700]">{averageRating}</span>
              <StarIcon
                className={`border-r-2 border-[#eaeaec] scale-[0.7]`}
                style={{ color: getRatingColor(averageRating) }}
              />
            </div>
            <span className="text-[16px] text-[400] text-[#535766]">
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
        <div className="font-[700] text-[16px] m-[0px] text-start mb-[15px]">
          MORE COLORS
        </div>
        <div className="flex gap-[15px] flex-wrap">
          {PRODUCT_DETAIL_CONSTANTS.MORE_COLOR_PRODUCT_IMAGES.map(
            (img, index) => (
              <img alt="" src={img} key={index} className="h-[73px] w-[55px]" />
            )
          )}
        </div>
      </div>
      {/* end product color */}

      {/* product size */}
      <div className="flex gap-[30px] items-center my-[12px]">
        <div className="font-[700] text-[16px] m-[0px]">SELECT SIZE</div>
        <div className="font-[700] text-[14px] cursor-pointer text-[#ff3e6c] leading-[16px] m-[0px] flex items-center">
          SIZE CHART
          <NavigateNextIcon />
        </div>
      </div>
      <div className="flex gap-[10px] mb-[10px]">
        {PRODUCT_DETAIL_CONSTANTS.PRODUCT_SIZE.map((sizeInfo) => (
          <div className="relative w-[50px]" key={sizeInfo.id}>
            <button
              className={`${
                sizeInfo.quantity === 0 ? "size-button-disabled" : ""
              } size-button-default`}
            >
              {sizeInfo.size}
            </button>
            {sizeInfo.quantity <= 3 && sizeInfo.quantity !== 0 ? (
              <span className="size-left-item leading-[15px]">2 left</span>
            ) : (
              <></>
            )}
            {sizeInfo.quantity === 0 ? (
              <span className="size-strike-show"></span>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
      {/* product size */}

      {/* add bag and wishlist button */}
      <div className="flex flex-wrap gap-[10px] h-[54px] w-full mb-[23px]">
        <button className="cursor-pointer bg-[#ff3f6c] max-w-[313px] w-full text-[#fff] font-bold text-[14px] rounded-[4px] flex items-center justify-center gap-[6px] hover:bg-[#ff527b] hover:border-transparent">
          <ShoppingBagOutlined className="!w-[20px] !h-[20px]" />
          <span>ADD TO BAG</span>
        </button>
        <button
          onClick={addToWishlist}
          className={` ${
            isWishlisted ? "!bg-[#535766] text-[#fff]" : ""
          } cursor-pointer border border-[#d4d5d9] text-[#282c3f] bg-[#fff] font-bold text-[14px]  rounded-[4px] flex items-center justify-center gap-[6px] hover:border-[#535766] w-full max-w-[207px]`}
        >
          {isWishlisted ? (
            <Favorite
              fill="bg-[#ff3e6c]"
              className="text-[#ff3e6c] "
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
            type="submit"
            className="text-sm font-medium text-[#ff3f6c] bg-transparent px-4 py-2 hover:bg-transparent hover:border-transparent"
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
    </div>
  );
};

export default ProductPrice;
