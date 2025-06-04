import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Radio } from "@mui/material";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { ProductStockItem } from "../../../utils/types";
import {
  BottomWearSizeChart,
  FootWearSizeChart,
  TopWearSizeChart,
} from "../../../assets";
interface ISizeChartProps {
  images: string[];
  productName: string;
  brandName: string;
  price: number;
  discount: number;
  handleSizeChartClick: () => void;
  sizesData: ProductStockItem[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  subCategory: { id: number; name: string };
}

const tabs = [
  { id: "size", label: "Size Chart" },
  { id: "measure", label: "How to measure" },
] as const;

type TabType = (typeof tabs)[number]["id"];

const SizeChart: React.FC<ISizeChartProps> = ({
  images,
  selectedSize,
  setSelectedSize,
  sizesData,
  handleSizeChartClick,
  brandName,
  discount,
  price,
  productName,
  subCategory,
}) => {
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

  const wishlistOpen = false;

  const inchesToCentimeters = (unit: string, amount: number) => {
    return unit === "Inches" ? amount.toFixed(1) : (amount * 2.54).toFixed(1);
  };

  const handleSizeSelect = (sizeId: string) => {
    setSelectedSize(String(sizeId) === String(selectedSize) ? "" : sizeId);
  };

  const discountedPrice = Math.round(
    Number(price.toString().replace(/[^\d]/g, "")) * (1 - discount / 100)
  );

  const renderImage = () => {
    switch (subCategory.name) {
      case "Topwear":
        return TopWearSizeChart;
      case "Bottom wear":
        return BottomWearSizeChart;
      case "Footwear":
        return FootWearSizeChart;
      default:
        return TopWearSizeChart; 
    }
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
              ₹{discountedPrice}{" "}
              <span className="line-through text-[#94969f] opacity-80 text-base mx-1">
                ₹{price}
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
          {activeTab === "size" ? (
            <div>
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
              <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="border border-[#eaeaec]">
                          <th className="sizeChartWeb-newCell sticky left-0 bg-white z-20"></th>
                          <th className="sizeChartWeb-newCell text-base font-[400] sticky left-[40px] bg-white z-20">
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
                              size.available
                                ? ""
                                : "opacity-40 pointer-events-none"
                            }`}
                            key={size.skuId}
                          >
                            <td className="sizeChartWeb-newCell text-base sticky left-0 bg-white z-10">
                              <Radio
                                checked={selectedSize === size.label}
                                onChange={() => handleSizeSelect(size.label)}
                                disabled={!size.available}
                                name="size"
                                sx={{
                                  "& .MuiSvgIcon-root": {
                                    fontSize: 20,
                                  },
                                  color: "#3880FF",
                                  "&.Mui-checked": {
                                    color: "#3880FF",
                                  },
                                }}
                              />
                            </td>

                            <td
                              className={`sizeChartWeb-newCell text-base sticky left-[40px] bg-white z-10 ${
                                size.available ? "" : "line-through"
                              }`}
                            >
                              {size.label}
                            </td>
                            {size.measurements.map(
                              (
                                measurement: { minValue: any },
                                index: React.Key
                              ) => (
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
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center gap-3 sticky bottom-0 bg-white  shadow-[0_0px_24px_[#eaeaec]] z-[1]">
                <button
                  disabled={!selectedSize}
                  className={`cursor-pointer ${
                    selectedSize
                      ? "bg-[#3880FF] hover:bg-[#3880FF]"
                      : "bg-gray-300 cursor-not-allowed"
                  } w-full text-[#fff] font-bold text-[14px] rounded-[4px] flex items-center justify-center gap-[6px] hover:border-transparent h-10`}
                >
                  <ShoppingBagOutlined className="!w-[20px] !h-[20px]" />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  // onClick={addToWishlist}
                  className={`h-10  ${
                    wishlistOpen ? "!bg-[#535766] text-[#fff]" : ""
                  } cursor-pointer border border-[#d4d5d9] text-[#282c3f] bg-[#fff] font-bold text-[14px]  rounded-[4px] flex items-center justify-center gap-[6px] hover:border-[#535766] w-full`}
                >
                  {wishlistOpen ? (
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
          ) : (
            <div className="transition-transform duration-300 ease-out pt-4 translate-y-0">
              <div className="text-center text-sm mt-2">
                * Garment Measurements in {measurementUnit}
              </div>
              <div className="text-center mt-4">
                <div className="px-4 text-[#282c3f] text-left font-semibold">
                  How to measure yourself
                </div>
                <img
                  src={renderImage()}
                  alt="Size Representation"
                  className="max-w-full w-auto h-auto mt-4 mx-auto mb-3  rounded-[4px]"
                />
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default SizeChart;
