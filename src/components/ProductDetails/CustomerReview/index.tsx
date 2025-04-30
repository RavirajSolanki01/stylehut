import { DislikeIcon, LikeIcon } from "../../../assets";
import { PRODUCT_DETAIL_CONSTANTS } from "../../../utils/constants";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";

const CustomerReview = () => {
  return (
    <div className="mt-[30px] text-start">
      {/* customer photos */}
      <p className="font-[700] text-[16px] m-[0px] mb-[15px] leading-1 text-[#282c3f]">
        Customer Photos (5)
      </p>
      <div className="flex flex-wrap gap-[10px]">
        {PRODUCT_DETAIL_CONSTANTS.PRODUCT_IMAGES.slice(0, 3).map((image) => (
          <img src={image} className="h-[75px] w-[75px]" />
        ))}
      </div>
      {/* end customer photos */}

      {/* customer review */}
      <p className="font-[700] text-[16px] m-[0px] mt-[25px] leading-1 text-[#282c3f]">
        Customer Review (5)
      </p>
      <div className="py-[20px]">
        <div className="relative !pl-[40px]">
          <div className="absolute top-[3px] left-[0px] w-[32px] h-[16px] bg-[#14958f] leading-[8px] flex items-center">
            <span className="text-[#fff] font-[700] p-[3px] text-[10px]">
              3.2
            </span>
            <GradeRoundedIcon className="text-[#fff] !text-[12px] font-[700]" />
          </div>
          <p className="text-[16px] leading-[20px] font-[400] text-[#282c3f] m-[0px]">
            Fitting is good.cloth's quality is good enough but could be better
            as it's an adidas product,but you can go for it. Dye is decent.
            Overall, it looks awesome.
          </p>
          <img
            src={PRODUCT_DETAIL_CONSTANTS.PRODUCT_IMAGES[0]}
            className="h-[75px] w-[75px] mt-[15px]"
          />
          <div className="flex w-full justify-between mt-[16px]">
            <div className="flex gap-[8px]">
              <span className="font-[400] text-[14px] text-[#565a63]">
                Ishank Kumar
              </span>
              <div className="w-px bg-[#eaeaec]"></div>
              <div className="font-[400] text-[14px] text-[#565a63]">
                5 Oct 2024
              </div>
            </div>
            <div className="flex justify-between max-w-[120px] w-full">
              <div className="flex items-center justify-center gap-[8px]">
                <img src={LikeIcon} />
                <span>2</span>
              </div>
              <div className="flex items-center justify-center gap-[8px]">
                <img src={DislikeIcon} />
                <span>0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t-[0px] w-full border-[#d2d2d2] mt-[0px]" />
      {/* end customer review */}

      <button className="my-[15px] button-none text-[#ff3f6c] text-[14px]/normal font-[700] hover:border-[transparent] p-[0px] bg-[#fff]">
        View all 4 Reviews
      </button>

      {/* seller info */}
      <p className="m-[0px] mb-[6px] pt-[4px] text-[#282c3f] font-[400] text-[16px]">
        Product Code: <span className="font-[700]">32249751</span>
      </p>
      <p className="text-[#282c3f] font-[400] text-[16px]">
        Seller:{" "}
        <span className="text-[#ff3f6c] font-[700] cursor-pointer">
          RetailNet
        </span>
      </p>
      <p className="text-[#282c3f] font-[700] text-[14px] cursor-pointer">
        View Supplier Information
      </p>
      {/* end seller info */}
    </div>
  );
};

export default CustomerReview;
