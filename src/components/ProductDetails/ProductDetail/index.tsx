"use client";
import { useState } from "react";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

import { PRODUCT_DETAIL_CONSTANTS } from "../../../utils/constants";

const ProductDetail = ({ description }: { description: string }) => {
  
  const [expanded, setExpanded] = useState(false);
  const VISIBLE_COUNT = 8;

  const specs = PRODUCT_DETAIL_CONSTANTS.PRODUCT_SPECIFICATION;
  const displayedSpecs = expanded ? specs : specs.slice(0, VISIBLE_COUNT);

  return (
    <div className="mt-[30px] text-start">
      <div className="flex gap-[8px] justify-start items-center mb-[16px]">
        <p className="font-[700] text-[16px] m-[0px] leading-1 text-[#282c3f] uppercase">
          Product Details
        </p>
        <ArticleOutlinedIcon className="!h-[22px] !w-[18px]" />
      </div>
      <div>
        <p className="product-description-content">{description}</p>
      </div>
      <div>
        <p className="product-description-title">Size & Fit</p>
        <p className="product-description-content">Brand Fit: Classic </p>
        <p className="product-description-content"> Fit: Regular Fit </p>
        <p className="product-description-content">
          The model (height 6') is wearing a size 40
        </p>
      </div>
      <div>
        <p className="product-description-title">Material & Care</p>
        <p className="product-description-content">100% Cotton</p>
        <p className="product-description-content">Machine Wash</p>
      </div>
      <div>
        <p className="product-description-title">Specifications</p>
        <div className="grid grid-cols-5 gap-x-[30px]">
          {displayedSpecs.map((item, index) => (
            <div key={index} className="col-span-2">
              <p className="text-[12px] text-[#7e818c] font-medium m-[0px] ">
                {item.label}
              </p>
              <p className="text-[16px] font-[400] text-[#282c3f] m-[0px] pb-[10px]">
                {item.value}
              </p>
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
    </div>
  );
};

export default ProductDetail;
