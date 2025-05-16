import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

interface ISizeChartProps {
  images: string[];
  handleSizeChartClick: () => void;
}

const sizes = [
  {
    skuId: 106389451,
    styleId: 32996331,
    action: "/product/32996331/related/XS?co=1",
    label: "XS",
    available: true,
    sizeType: null,
    originalStyle: true,
    measurements: [
      {
        type: "Garment Measurement",
        name: "Chest",
        value: "32.3",
        minValue: "32.2",
        maxValue: "32.2",
        unit: "Inches",
        displayText: "32.25in",
      },
      {
        type: "Garment Measurement",
        name: "Waist",
        value: "28.3",
        minValue: "28.3",
        maxValue: "28.3",
        unit: "Inches",
        displayText: "28.25in",
      },
    ],
    allSizesList: [
      {
        scaleCode: "myntra_size",
        sizeValue: "XS",
        size: "Size",
        order: 1,
        prefix: "",
      },
    ],
    sizeSellerData: [
      {
        mrp: 1199,
        sellerPartnerId: 6771,
        availableCount: 26,
        sellableInventoryCount: 26,
        warehouses: ["910", "27870"],
        supplyType: "ON_HAND",
        discountId: "",
        discountedPrice: 1199,
        countryOfOrigin: ["Bangladesh"],
        manufacturerInfo:
          "IMPRESS-NEWTEX COMPOSITE TEXTILES  LTD., Gorai Industrial Area,,Mirzapur,1942,Tangail | Arvind Smart Textiles Limited, Ring-Road,Vill-Malti,Rampur,,834010,Ranchi",
        importerInfo:
          "H&M Hennes & Mauritz Retail Pvt. Ltd. A-wing, D-3, 2nd Floor District Centre Saket New Delhi -110017 India",
        packerInfo:
          "IMPRESS-NEWTEX COMPOSITE TEXTILES  LTD., Gorai Industrial Area,,Mirzapur,1942,Tangail | Arvind Smart Textiles Limited, Ring-Road,Vill-Malti,Rampur,,834010,Ranchi",
        procurementTimeInDays: 0,
        expiryDate: "0",
        frgListLink:
          "/free-gift-list?baseStyleId=32996331&sellerPartnerId=6771&skuId=106389451&src=pdp",
        perUnitAmount: null,
      },
    ],
    kidsSizeMeasurements: null,
    mrpPerUnitData: null,
    netQuantity: null,
    selectedSeller: {
      sellerPartnerId: 6771,
      discountedPrice: 1199,
      availableCount: 26,
      sellableInventoryCount: 26,
      manufacturerInfo:
        "IMPRESS-NEWTEX COMPOSITE TEXTILES  LTD., Gorai Industrial Area,,Mirzapur,1942,Tangail | Arvind Smart Textiles Limited, Ring-Road,Vill-Malti,Rampur,,834010,Ranchi",
      importerInfo:
        "H&M Hennes & Mauritz Retail Pvt. Ltd. A-wing, D-3, 2nd Floor District Centre Saket New Delhi -110017 India",
      packerInfo:
        "IMPRESS-NEWTEX COMPOSITE TEXTILES  LTD., Gorai Industrial Area,,Mirzapur,1942,Tangail | Arvind Smart Textiles Limited, Ring-Road,Vill-Malti,Rampur,,834010,Ranchi",
      expiryDate: "0",
      mrpPerUnitData: null,
    },
  },
  {
    skuId: 106389452,
    styleId: 32996331,
    action: "/product/32996331/related/S?co=1",
    label: "S",
    available: false,
    sizeType: null,
    originalStyle: true,
    measurements: [
      {
        type: "Garment Measurement",
        name: "Chest",
        value: "34.5",
        minValue: "34.5",
        maxValue: "34.5",
        unit: "Inches",
        displayText: "34.5in",
      },
      {
        type: "Garment Measurement",
        name: "Waist",
        value: "31.5",
        minValue: "31.5",
        maxValue: "31.5",
        unit: "Inches",
        displayText: "31.5in",
      },
    ],
    allSizesList: [
      {
        scaleCode: "myntra_size",
        sizeValue: "S",
        size: "Size",
        order: 1,
        prefix: "",
      },
    ],
    sizeSellerData: [],
    kidsSizeMeasurements: null,
    mrpPerUnitData: null,
    netQuantity: null,
    selectedSeller: {
      discountedPrice: 1199,
      mrpPerUnitData: null,
    },
  },
  {
    skuId: 106389453,
    styleId: 32996331,
    action: "/product/32996331/related/M?co=1",
    label: "M",
    available: true,
    sizeType: null,
    originalStyle: true,
    measurements: [
      {
        type: "Garment Measurement",
        name: "Chest",
        value: "37.6",
        minValue: "37.6",
        maxValue: "37.6",
        unit: "Inches",
        displayText: "37.63in",
      },
      {
        type: "Garment Measurement",
        name: "Waist",
        value: "34.5",
        minValue: "34.5",
        maxValue: "34.5",
        unit: "Inches",
        displayText: "34.5in",
      },
    ],
    allSizesList: [
      {
        scaleCode: "myntra_size",
        sizeValue: "M",
        size: "Size",
        order: 1,
        prefix: "",
      },
    ],
    sizeSellerData: [
      {
        mrp: 1199,
        sellerPartnerId: 6771,
        availableCount: 72,
        sellableInventoryCount: 72,
        warehouses: ["910", "27870"],
        supplyType: "ON_HAND",
        discountId: "",
        discountedPrice: 1199,
        countryOfOrigin: ["Bangladesh"],
        manufacturerInfo:
          "IMPRESS-NEWTEX COMPOSITE TEXTILES  LTD., Gorai Industrial Area,,Mirzapur,1942,Tangail | Arvind Smart Textiles Limited, Ring-Road,Vill-Malti,Rampur,,834010,Ranchi",
        importerInfo:
          "H&M Hennes & Mauritz Retail Pvt. Ltd. A-wing, D-3, 2nd Floor District Centre Saket New Delhi -110017 India",
        packerInfo:
          "IMPRESS-NEWTEX COMPOSITE TEXTILES  LTD., Gorai Industrial Area,,Mirzapur,1942,Tangail | Arvind Smart Textiles Limited, Ring-Road,Vill-Malti,Rampur,,834010,Ranchi",
        procurementTimeInDays: 0,
        expiryDate: "0",
        frgListLink:
          "/free-gift-list?baseStyleId=32996331&sellerPartnerId=6771&skuId=106389453&src=pdp",
        perUnitAmount: null,
      },
    ],
    kidsSizeMeasurements: null,
    mrpPerUnitData: null,
    netQuantity: null,
    selectedSeller: {
      sellerPartnerId: 6771,
      discountedPrice: 1199,
      availableCount: 72,
      sellableInventoryCount: 72,
      manufacturerInfo:
        "IMPRESS-NEWTEX COMPOSITE TEXTILES  LTD., Gorai Industrial Area,,Mirzapur,1942,Tangail | Arvind Smart Textiles Limited, Ring-Road,Vill-Malti,Rampur,,834010,Ranchi",
      importerInfo:
        "H&M Hennes & Mauritz Retail Pvt. Ltd. A-wing, D-3, 2nd Floor District Centre Saket New Delhi -110017 India",
      packerInfo:
        "IMPRESS-NEWTEX COMPOSITE TEXTILES  LTD., Gorai Industrial Area,,Mirzapur,1942,Tangail | Arvind Smart Textiles Limited, Ring-Road,Vill-Malti,Rampur,,834010,Ranchi",
      expiryDate: "0",
      mrpPerUnitData: null,
    },
  },
  {
    skuId: 106389454,
    styleId: 32996331,
    action: "/product/32996331/related/L?co=1",
    label: "L",
    available: true,
    sizeType: null,
    originalStyle: true,
    measurements: [
      {
        type: "Garment Measurement",
        name: "Chest",
        value: "40.8",
        minValue: "40.7",
        maxValue: "40.7",
        unit: "Inches",
        displayText: "40.75in",
      },
      {
        type: "Garment Measurement",
        name: "Waist",
        value: "37.8",
        minValue: "37.8",
        maxValue: "37.8",
        unit: "Inches",
        displayText: "37.75in",
      },
    ],
    allSizesList: [
      {
        scaleCode: "myntra_size",
        sizeValue: "L",
        size: "Size",
        order: 1,
        prefix: "",
      },
    ],
    sizeSellerData: [
      {
        mrp: 1199,
        sellerPartnerId: 6771,
        availableCount: 82,
        sellableInventoryCount: 82,
        warehouses: ["910", "27870"],
        supplyType: "ON_HAND",
        discountId: "",
        discountedPrice: 1199,
        countryOfOrigin: ["Bangladesh"],
        manufacturerInfo:
          "IMPRESS-NEWTEX COMPOSITE TEXTILES  LTD., Gorai Industrial Area,,Mirzapur,1942,Tangail | Arvind Smart Textiles Limited, Ring-Road,Vill-Malti,Rampur,,834010,Ranchi",
        importerInfo:
          "H&M Hennes & Mauritz Retail Pvt. Ltd. A-wing, D-3, 2nd Floor District Centre Saket New Delhi -110017 India",
        packerInfo:
          "IMPRESS-NEWTEX COMPOSITE TEXTILES  LTD., Gorai Industrial Area,,Mirzapur,1942,Tangail | Arvind Smart Textiles Limited, Ring-Road,Vill-Malti,Rampur,,834010,Ranchi",
        procurementTimeInDays: 0,
        expiryDate: "0",
        frgListLink:
          "/free-gift-list?baseStyleId=32996331&sellerPartnerId=6771&skuId=106389454&src=pdp",
        perUnitAmount: null,
      },
    ],
    kidsSizeMeasurements: null,
    mrpPerUnitData: null,
    netQuantity: null,
    selectedSeller: {
      sellerPartnerId: 6771,
      discountedPrice: 1199,
      availableCount: 82,
      sellableInventoryCount: 82,
      manufacturerInfo:
        "IMPRESS-NEWTEX COMPOSITE TEXTILES  LTD., Gorai Industrial Area,,Mirzapur,1942,Tangail | Arvind Smart Textiles Limited, Ring-Road,Vill-Malti,Rampur,,834010,Ranchi",
      importerInfo:
        "H&M Hennes & Mauritz Retail Pvt. Ltd. A-wing, D-3, 2nd Floor District Centre Saket New Delhi -110017 India",
      packerInfo:
        "IMPRESS-NEWTEX COMPOSITE TEXTILES  LTD., Gorai Industrial Area,,Mirzapur,1942,Tangail | Arvind Smart Textiles Limited, Ring-Road,Vill-Malti,Rampur,,834010,Ranchi",
      expiryDate: "0",
      mrpPerUnitData: null,
    },
  },
  {
    skuId: 106389455,
    styleId: 32996331,
    action: "/product/32996331/related/XL?co=1",
    label: "XL",
    available: true,
    sizeType: null,
    originalStyle: true,
    measurements: [
      {
        type: "Garment Measurement",
        name: "Chest",
        value: "43.8",
        minValue: "43.7",
        maxValue: "43.7",
        unit: "Inches",
        displayText: "43.75in",
      },
      {
        type: "Garment Measurement",
        name: "Waist",
        value: "41.0",
        minValue: "41.0",
        maxValue: "41.0",
        unit: "Inches",
        displayText: "41.0in",
      },
    ],
    allSizesList: [
      {
        scaleCode: "myntra_size",
        sizeValue: "XL",
        size: "Size",
        order: 1,
        prefix: "",
      },
    ],
    sizeSellerData: [
      {
        mrp: 1199,
        sellerPartnerId: 6771,
        availableCount: 19,
        sellableInventoryCount: 19,
        warehouses: ["910", "27870"],
        supplyType: "ON_HAND",
        discountId: "",
        discountedPrice: 1199,
        countryOfOrigin: ["Bangladesh"],
        manufacturerInfo:
          "IMPRESS-NEWTEX COMPOSITE TEXTILES  LTD., Gorai Industrial Area,,Mirzapur,1942,Tangail | Arvind Smart Textiles Limited, Ring-Road,Vill-Malti,Rampur,,834010,Ranchi",
        importerInfo:
          "H&M Hennes & Mauritz Retail Pvt. Ltd. A-wing, D-3, 2nd Floor District Centre Saket New Delhi -110017 India",
        packerInfo:
          "IMPRESS-NEWTEX COMPOSITE TEXTILES  LTD., Gorai Industrial Area,,Mirzapur,1942,Tangail | Arvind Smart Textiles Limited, Ring-Road,Vill-Malti,Rampur,,834010,Ranchi",
        procurementTimeInDays: 0,
        expiryDate: "0",
        frgListLink:
          "/free-gift-list?baseStyleId=32996331&sellerPartnerId=6771&skuId=106389455&src=pdp",
        perUnitAmount: null,
      },
    ],
    kidsSizeMeasurements: null,
    mrpPerUnitData: null,
    netQuantity: null,
    selectedSeller: {
      sellerPartnerId: 6771,
      discountedPrice: 1199,
      availableCount: 19,
      sellableInventoryCount: 19,
      manufacturerInfo:
        "IMPRESS-NEWTEX COMPOSITE TEXTILES  LTD., Gorai Industrial Area,,Mirzapur,1942,Tangail | Arvind Smart Textiles Limited, Ring-Road,Vill-Malti,Rampur,,834010,Ranchi",
      importerInfo:
        "H&M Hennes & Mauritz Retail Pvt. Ltd. A-wing, D-3, 2nd Floor District Centre Saket New Delhi -110017 India",
      packerInfo:
        "IMPRESS-NEWTEX COMPOSITE TEXTILES  LTD., Gorai Industrial Area,,Mirzapur,1942,Tangail | Arvind Smart Textiles Limited, Ring-Road,Vill-Malti,Rampur,,834010,Ranchi",
      expiryDate: "0",
      mrpPerUnitData: null,
    },
  },
  {
    skuId: 106389456,
    styleId: 32996331,
    action: "/product/32996331/related/XXL?co=1",
    label: "XXL",
    available: false,
    sizeType: null,
    originalStyle: true,
    measurements: [
      {
        type: "Garment Measurement",
        name: "Chest",
        value: "47.1",
        minValue: "47.1",
        maxValue: "47.1",
        unit: "Inches",
        displayText: "47.13in",
      },
      {
        type: "Garment Measurement",
        name: "Waist",
        value: "44.0",
        minValue: "44.0",
        maxValue: "44.0",
        unit: "Inches",
        displayText: "44.0in",
      },
    ],
    allSizesList: [
      {
        scaleCode: "myntra_size",
        sizeValue: "XXL",
        size: "Size",
        order: 1,
        prefix: "",
      },
    ],
    sizeSellerData: [],
    kidsSizeMeasurements: null,
    mrpPerUnitData: null,
    netQuantity: null,
    selectedSeller: {
      discountedPrice: 1199,
      mrpPerUnitData: null,
    },
  },
];

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
  handleSizeChartClick,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("size");
  const allSizesList = sizes[0]?.allSizesList;
  const measurements = sizes[0]?.measurements;
  const [measurementUnit, setMeasurementUnit] = useState<string>(
    measurements[0]?.unit ?? "Inches"
  );

  const wishlistOpen = false;

  const inchesToCentimeters = (unit: string, amount: number) => {
    if (unit === "Inches") {
      return amount.toFixed(1);
    } else {
      return (amount * 2.54).toFixed(1);
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
            <h2 className="text-xl font-semibold">Red Tape</h2>
            <p className="text-lg text-[#282c3f] mt-1 mb-1">
              Red Tape Men Colourblocked Lace-Ups Round Toe Sneakers
            </p>
            <p className="mt-1 text-base font-semibold text-[#282c3f]">
              ₹1259{" "}
              <span className="line-through text-[#94969f] opacity-80 text-base">
                ₹6999
              </span>
              <span className="text-[#ff905a] font-semibold text-base">
                {" "}
                (82% OFF)
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
                {allSizesList.map((size) => (
                  <th
                    className="sizeChartWeb-newCell text-base font-[400]"
                    key={size.sizeValue}
                  >
                    {size.sizeValue}
                  </th>
                ))}
                {measurements.map((measurement) => (
                  <th
                    className="sizeChartWeb-newCell text-base font-[400]"
                    key={measurement.name}
                  >
                    {measurement.name} ({measurementUnit.slice(0, 2)})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
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
                        className=""
                        id="106389451"
                        // value="on"
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
                  {size.measurements.map((measurement, index) => (
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
                  ))}
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
            <button
              // onClick={addToCart}
              className="cursor-pointer bg-[#3880FF]  w-full text-[#fff] font-bold text-[14px] rounded-[4px] flex items-center justify-center gap-[6px] hover:bg-[#3880FF] hover:border-transparent h-10"
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
      </aside>
    </div>
  );
};

export default SizeChart;
