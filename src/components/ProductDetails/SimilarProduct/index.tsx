import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import { PRODUCT_DETAIL_CONSTANTS } from "../../../utils/constants";

const SimilarProduct = () => {
  return (
    <div className="text-center">
      <div className="flex gap-[8px] justify-start items-center mb-[16px]">
        <p className="font-[700] text-[16px] m-[0px] leading-1 text-[#282c3f] uppercase">
          Similar Product
        </p>
      </div>
      <div className="text-start flex flex-wrap gap-[27px]">
        {PRODUCT_DETAIL_CONSTANTS.SIMILAR_PRODUCT.map((product) => {
          const discountedPrice = Math.round(
            Number(product.price.replace(/[^\d]/g, "")) *
              (1 - product.discount / 100)
          );
          return (
            <div
              className="block bg-white shadow-secondary-1 w-[194px] border border-[#e9e9eb]"
              key={product.id}
            >
              <div className="relative">
                <img
                  className="rounded-t-lg w-full h-[260px]"
                  src={product.imgUrl}
                  alt=""
                />
                <div className="absolute w-[32px] h-[16px] bg-[#fff] border border-[#eaeaec] leading-[11px] left-[10px] bottom-[10px] p-[3px] text-[10px] font-[700] text-[#282c3f] flex gap-[2px]">
                  3.2
                  <GradeRoundedIcon className="text-[#14958f] !text-[9px]" />
                </div>
              </div>
              <div className="p-[10px] text-surface w-full">
                <p className="font-[700] text-[#282c3f] text-[16px] m-[0px]">
                  {product.brandName}
                </p>
                <p className="w-full whitespace-nowrap overflow-hidden text-ellipsis font-[400] text-[14px] text-[#535766] m-[0px] mt-[4px] mb-[8px]">
                  {product.title}
                </p>
                <div className="w-full whitespace-nowrap overflow-hidden text-ellipsis font-[400] text-[14px] text-[#535766] m-[0px] mt-[4px] mb-[8px]">
                  <p className="font-[700] text-[#282c3f] text-[16px] m-[0px] pr-[3px]">
                    Rs. {discountedPrice}
                    <span className="font-[700] text-[#535665] text-[12px] m-[0px] px-[3px] line-through">
                      Rs. {product.price}
                    </span>
                    <span className="font-[700] text-[#ff905a] text-[12px] m-[0px] px-[3px] uppercase">
                      ({product.discount}% off)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarProduct;
