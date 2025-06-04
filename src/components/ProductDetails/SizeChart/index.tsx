import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { ProductStockItem } from "../../../utils/types";
import { ArrowRightAltSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
interface ISizeChartProps {
  images: string[];
  productName: string;
  brandName: string;
  price: number;
  discount: number;
  isAddedToCart?: boolean;
  isWishlisted?: boolean;
  handleSizeChartClick: () => void;
  sizesData: ProductStockItem[];
  selectedSize: number | undefined;
  addToCart?: (id: number | undefined) => void;
  addToWishlist?: () => void;
  setSelectedSize: (size: number | undefined) => void;
}

const sizeChart = {
  sizeChartUrl: null,
  sizeRepresentationUrl:
    "http://assets.myntassets.com/assets/images/sizechart/2016/12/14/11481690842463-Tshirts_men.png",
};

const tabs = [
  { id: "size", label: "Size Chart" },
  { id: "measure", label: "How to measure" },
] as const;

type TabType = (typeof tabs)[number]["id"];

const SizeChart: React.FC<ISizeChartProps> = ({
  images,
  selectedSize,
  price,
  discount,
  isAddedToCart,
  isWishlisted = false,
  productName,
  brandName,
  setSelectedSize,
  sizesData,
  handleSizeChartClick,
  addToCart,
  addToWishlist,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("size");

  const sizes = sizesData.map((item) => ({
    skuId: item.id,
    label: item.size_data?.size,
    available: item.quantity > 0,
    measurements:
      item.size_data?.size_chart_data?.map(
        (chart: { size_field_name: any; size_field_value: string }) => ({
          name: chart.size_field_name,
          minValue: parseFloat(chart.size_field_value),
        })
      ) || [],
  }));

  const measurements =
    sizesData[0]?.size_data?.size_chart_data?.map(
      (m: { size_field_name: any }) => ({
        name: m.size_field_name,
        unit: !sizesData[0]?.size_data?.is_cm ? "Inches" : "Cm",
      })
    ) || [];

  const [measurementUnit, setMeasurementUnit] = useState<string>(
    measurements[0]?.unit ?? "Inches"
  );

  const inchesToCentimeters = (unit: string, amount: number) => {
    return unit === "Inches" ? amount.toFixed(1) : (amount * 2.54).toFixed(1);
  };

  const handleSizeSelect = (sizeId: number) => {
    setSelectedSize(sizeId === selectedSize ? 0 : sizeId);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
      <aside className="w-full max-w-[700px] bg-white shadow-lg overflow-y-auto">
        <div className="p-2">
          <IconButton onClick={handleSizeChartClick}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className="flex items-start space-x-8 px-4 mt-2 mb-8">
          <img
            src={images?.[0] || ""}
            alt="Product"
            className="w-40 h-50 object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{brandName}</h2>
            <p className="text-lg text-[#282c3f] mt-1 mb-1">{productName}</p>
            <p className="mt-1 text-base font-semibold text-[#282c3f]">
              ₹{(price - price * (discount / 100)).toFixed(0)}{" "}
              <span className="line-through text-[#94969f] opacity-80 text-base">
                MRP ₹{price}
              </span>
              <span className="text-[#ff905a] font-semibold text-base">
                {" "}
                ({discount}% OFF)
              </span>
            </p>
          </div>
        </div>
        <div className="relative">
          {/* Tabs */}
          <div className="flex border border-[#eaeaec] sticky top-0 z-10 bg-white">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 text-center py-3 h-fit cursor-pointer text-lg ${
                  activeTab === tab.id
                    ? "text-[#3880FF] border-b-2 border-[#3880FF] font-semibold"
                    : "text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="px-4 py-2 flex items-center justify-end">
            <div className="border border-[#eaeaec] rounded-full p-[2px] flex items-center">
              <button
                onClick={() => setMeasurementUnit("Inches")}
                className={`cursor-pointer px-2 py-1 ${
                  measurementUnit == "Inches"
                    ? "text-white bg-black  rounded-full"
                    : ""
                }`}
              >
                in
              </button>
              <button
                onClick={() => setMeasurementUnit("Cm")}
                className={`cursor-pointer px-2 py-1 ${
                  measurementUnit == "Cm"
                    ? "text-white bg-black rounded-full"
                    : ""
                }`}
              >
                cm
              </button>
            </div>
          </div>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="border border-[#eaeaec]">
                <th className="sizeChartWeb-newCell"></th>
                <th className="sizeChartWeb-newCell text-base font-[400]">
                  Size
                </th>
                {measurements.map((measurement: { name: any }) => (
                  <th
                    className="sizeChartWeb-newCell text-base font-[400]"
                    key={String(measurement.name)}
                  >
                    {measurement.name} ({measurementUnit.slice(0, 2)})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((size: any) => (
                <tr
                  className={`border border-[#eaeaec] ${
                    size.available ? "" : "opacity-40 pointer-events-none"
                  }`}
                  key={size.skuId}
                >
                  <td className="sizeChartWeb-newCell text-base">
                    <label className="common-customRadio common-newCustomRadio">
                      <input
                        type="radio"
                        name="size"
                        checked={selectedSize === size.skuId}
                        onChange={() => handleSizeSelect(size.skuId)}
                        disabled={!size.available}
                      />
                      <div className="common-radioIndicator sizeChartWeb-radioIndicator common-radioIndicatorNew sizeChartWeb-radioIndicatorNew"></div>
                    </label>
                  </td>

                  <td
                    className={`sizeChartWeb-newCell text-base ${
                      size.available ? "" : "line-through"
                    }`}
                  >
                    {size.label}
                  </td>
                  {size.measurements.map(
                    (measurement: { minValue: any }, index: React.Key) => (
                      <td
                        className={`sizeChartWeb-newCell text-base ${
                          size.available ? "" : "line-through"
                        }`}
                        key={index}
                      >
                        {inchesToCentimeters(
                          measurementUnit,
                          Number(measurement.minValue)
                        )}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="h-2 w-full bg-[#f5f5f6]"></div>
          <div className="transition-transform duration-300 ease-out translate-y-0">
            <div className="text-center text-sm mt-2">
              * Garment Measurements in {measurementUnit}
            </div>
            <div className="text-center mt-4">
              <div className="px-4 text-[#282c3f] text-left font-semibold">
                How to measure yourself
              </div>
              <img
                src={sizeChart.sizeRepresentationUrl}
                alt="Size Representation"
                className="max-w-full w-auto h-auto mt-4 mx-auto mb-3  rounded-[4px]"
              />
            </div>
          </div>
          <div className="p-4 flex items-center gap-3 sticky bottom-0 bg-white  shadow-[0_0px_24px_[#eaeaec]] z-[1]">
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
                disabled={!selectedSize}
                onClick={() => addToCart?.(selectedSize)}
                className={`cursor-pointer ${
                  selectedSize
                    ? "bg-[#3880FF] hover:bg-[#3880FF]"
                    : "bg-gray-300 cursor-not-allowed"
                } w-full text-[#fff] font-bold text-[14px] rounded-[4px] flex items-center justify-center gap-[6px] hover:border-transparent h-10`}
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
        </div>
      </aside>
    </div>
  );
};

export default SizeChart;
