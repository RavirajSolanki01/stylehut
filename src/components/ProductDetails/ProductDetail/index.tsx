"use client";
import { useState } from "react";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

import { PRODUCT_DETAIL_CONSTANTS } from "../../../utils/constants";
import { ProductAdditionalDetails, ProductSpecifications } from "../../../utils/types";

const ProductDetail = ({
  description,
  productAdditionalDetails,
  productSpecifications,
}: {
  description: string;
  productAdditionalDetails: ProductAdditionalDetails[];
  productSpecifications: ProductSpecifications[];
}) => {
  const [expanded, setExpanded] = useState(false);
  const VISIBLE_COUNT = 8;

  const specs = PRODUCT_DETAIL_CONSTANTS.PRODUCT_SPECIFICATION;
  const displayedSpecs = expanded ? productSpecifications : productSpecifications.slice(0, VISIBLE_COUNT);

  return (
    <div className="mt-[30px] text-start">
      <div className="flex gap-[8px] justify-start items-center mb-[16px]">
        <p className="font-[700] text-[16px] m-[0px] leading-1 text-[#282c3f] uppercase">Product Details</p>
        <ArticleOutlinedIcon className="!h-[22px] !w-[18px]" />
      </div>
      <div>
        <p className="product-description-content">{description}</p>
      </div>
      {productAdditionalDetails.length > 0 &&
        productAdditionalDetails.map((item, index) => (
          <div key={index}>
            <p className="product-description-title">{item.product_additional_detail_key.name}</p>
            <p className="product-description-content">{item.value}</p>
          </div>
        ))}
      {displayedSpecs.length > 0 && (
        <div>
          <p className="product-description-title">Specifications</p>
          <div className="grid grid-cols-5 gap-x-[30px]">
            {displayedSpecs.map((item, index) => (
              <div key={index} className="col-span-2">
                <p className="text-[12px] text-[#7e818c] font-medium m-[0px] ">{item.product_specification_key.name}</p>
                <p className="text-[16px] font-[400] text-[#282c3f] m-[0px] pb-[10px]">{item.value}</p>
                <hr className="border-t-[0px] w-full border-[#d2d2d2] mt-[0px]" />
              </div>
            ))}
          </div>
          {specs.length > VISIBLE_COUNT && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="button-none text-[#3880FF] text-[14px]/normal font-[700] hover:border-[transparent] p-[0px] bg-[#fff] mt-[10px] mb-[20px]"
            >
              {expanded ? "See less" : "See more"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
