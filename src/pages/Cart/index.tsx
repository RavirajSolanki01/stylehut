import React, { useState } from "react";
import { Logo } from "../../assets";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { pink } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { CartAddresses } from "./CartAddress";

type CartItem = {
  id: number;
  name: string;
  description: string;
  size: string;
  qty: number;
  price: number;
  originalPrice: number;
  image: string;
  isAvailable: boolean;
  isSelected: boolean;
};

type Props = {
  setMaxAllowedStep: (step: number) => void;
};

export const ProductCart: React.FC = () => {
  const navigate = useNavigate();
  const steps = ["BAG", "ADDRESS", "PAYMENT"];
  const [activeStep, setActiveStep] = useState(0);
  const [maxAllowedStep, setMaxAllowedStep] = useState(1);

  const handleStepClick = (index: number) => {
    if (index <= maxAllowedStep) {
      setActiveStep(index);
    }
  };

  const getStepStyle = (index: number) => {
    if (index === activeStep) {
      return "text-[#03A685] border-b-2 border-[#03A685] pb-[2px] cursor-pointer";
    } else if (index <= maxAllowedStep) {
      return "text-[#282c3f] cursor-pointer hover:text-[#03A685]";
    } else {
      return "text-[#d3d3d3] cursor-not-allowed";
    }
  };

  return (
    <>
      <div className="fixed w-full top-0 z-50 bg-white flex justify-between items-center shadow-md px-[50px] py-[10px]">
        <div className="flex items-center">
          <img
            onClick={() => navigate("/home")}
            src={Logo}
            alt="myntra_logo"
            className="max-h-[60px] max-w-[60px] h-full w-full cursor-pointer"
          />
        </div>

        <ol className="flex items-center text-sm font-semibold tracking-[3px]">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              <li
                onClick={() => handleStepClick(index)}
                className={`${getStepStyle(
                  index
                )} transition duration-200 text-[12px]`}
              >
                {step}
              </li>
              {index < steps.length - 1 && (
                <li className="mx-2 text-[#d3d3d3] select-none">---------</li>
              )}
            </React.Fragment>
          ))}
        </ol>

        <div className="flex items-center">
          <img
            src="https://constant.myntassets.com/checkout/assets/img/sprite-secure.png"
            alt="secure_icon"
            className="max-h-[28px] max-w-[26px] h-full w-full cursor-pointer mr-3"
          />
          <p className="text-[#535766] text-[12px] tracking-[3px]">
            100% SECURE
          </p>
        </div>
      </div>

      <div className="flex flex-col max-w-[1050px] w-full mx-auto justify-center my-6">
        {activeStep === 0 ? (
          <CartItemsList setMaxAllowedStep={setMaxAllowedStep} />
        ) : activeStep === 1 ? (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-[70%]">
              <CartAddresses />
            </div>
            <PriceSummary setMaxAllowedStep={setMaxAllowedStep} />
          </div>
        ) : (
          <div>Payment</div>
        )}
      </div>
    </>
  );
};

const PriceSummary: React.FC<Props> = ({ setMaxAllowedStep }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const selectedItems = cartItems.filter(
    (item) => item.isSelected && item.isAvailable
  );
  const totalMRP = selectedItems.reduce(
    (acc, item) => acc + item.originalPrice * item.qty,
    0
  );
  const totalDiscount = selectedItems.reduce(
    (acc, item) => acc + (item.originalPrice - item.price) * item.qty,
    0
  );
  const totalAmount =
    selectedItems.reduce((acc, item) => acc + item.price * item.qty, 0) + 20; // + platform fee

  const handlePlaceOrder = () => {
    if (selectedItems.length > 0) {
      setMaxAllowedStep(2);
      setCartItems([]);
    }
  };
  return (
    <div className="w-full md:w-[30%]">
      <div className="border rounded-md p-4 shadow-sm">
        <p className="font-semibold mb-2">
          PRICE DETAILS ({selectedItems.length} Item)
        </p>
        <div className="text-sm flex justify-between">
          <span>Total MRP</span> <span>₹{totalMRP}</span>
        </div>
        <div className="text-sm flex justify-between text-green-600">
          <span>Discount on MRP</span> <span>-₹{totalDiscount}</span>
        </div>
        <div className="text-sm flex justify-between">
          <span>Coupon Discount</span>{" "}
          <span className="text-pink-600 cursor-pointer">Apply Coupon</span>
        </div>
        <div className="text-sm flex justify-between">
          <span>Platform Fee</span> <span>₹20</span>
        </div>
        <div className="text-sm flex justify-between">
          <span>Shipping Fee</span> <span className="text-green-600">FREE</span>
        </div>
        <hr className="my-3" />
        <div className="text-base font-bold flex justify-between">
          <span>Total Amount</span> <span>₹{totalAmount}</span>
        </div>
        <button
          className="w-full mt-4 bg-pink-600 text-white text-sm font-semibold py-2 rounded disabled:bg-gray-400"
          disabled={selectedItems.length === 0}
          onClick={handlePlaceOrder}
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

const CartItemsList: React.FC<Props> = ({ setMaxAllowedStep }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const selectedItems = cartItems.filter(
    (item) => item.isSelected && item.isAvailable
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Cart Items */}
      <div className="w-full md:w-[70%]">
        <div className="flex items-center justify-between max-h-[250px] py-2 px-4 bg-[#fff6f4] border border-[#eaeaec] rounded-md">
          <div>
            <p className="text-[#282c3f] text-[12px] font-normal">
              Deliver to :{" "}
              <span className="text-[#282c3f] font-bold">
                Neha Makwana, 382245
              </span>
            </p>
            <p className="text-[#282c3f] text-[12px] font-normal">
              {" "}
              Alnoor park society, Aniyali road, Ranpur , Ahmedabad
            </p>
          </div>
          <button
            className="cursor-pointer bg-transparent border border-[#ff3f6c] text-[#ff3f6c] text-center 
              px-[10px] max-w-[250px] py-[7px] my-[15px] text-[12px] font-[700] rounded-md uppercase 
             hover:font-[700] transition-colors duration-300
              hover:border-[#ff3f6c]  focus:outline-none"
          >
            Change address
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div className="py-4 font-semibold text-sm text-gray-800">
            <Checkbox
              sx={{
                color: pink[500],
                "&.Mui-checked": {
                  color: pink[500],
                },
              }}
              checked={
                selectedItems.length ===
                cartItems.filter((i) => i.isAvailable).length
              }
              onChange={(e) =>
                setCartItems((prev) =>
                  prev.map((item) =>
                    item.isAvailable
                      ? { ...item, isSelected: e.target.checked }
                      : item
                  )
                )
              }
            />
            {selectedItems.length}/{cartItems.length} ITEMS SELECTED
          </div>
          <div className="flex w-full max-w-[310px] items-center text-sm font-semibold p-2">
            <button className="max-w-[100px] w-full font-bold text-[#535766] p-1 focus:outline-none uppercase">
              REMOVE
            </button>
            <div className="border-l border-gray-300 h-5 mx-2" />
            <button className="max-w-[200px] w-full font-bold text-[#535766] p-1 focus:outline-none uppercase">
              Move to whishlist
            </button>
          </div>
        </div>
        <div className="border border-[#eaeaec] rounded-md p-4">
          <div className="relative">
            <button
              className="absolute right-1 text-gray-500 hover:text-black"
              onClick={() => console.log("Close clicked")}
            >
              <CloseIcon fontSize="small" />
            </button>
            <div className="flex">
              <img
                className="max-w-[112px] max-h-[148px] h-full w-full"
                src="https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/28045054/2024/3/5/64027d7e-8860-4cfb-8f32-bf37994055021709636226016TokyoTalkiesWomenGreenSolidButtonedPlaysuit1.jpg"
                alt="product-image"
              />
              <div className="flex flex-col gap-1 mx-4">
                <p>Tokyo Tolkies</p>
                <p>Green Shirt Collar Waist Tie-Ups Playsuit</p>
                <div className="flex items-center my-4">
                  <div className="max-w-[70px] w-full text-[14px] bg-[#f5f5f6] px-2 py-1 flex items-center justify-between cursor-pointer">
                    <span>Size: S</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 10 6"
                      fill="currentColor"
                      className="w-2 h-2 text-gray-600 ml-1"
                    >
                      <path d="M0 0L5 6L10 0H0Z" />
                    </svg>
                  </div>
                  <div className="max-w-[70px] w-full text-[14px] bg-[#f5f5f6] px-2 py-1 mx-2 flex items-center justify-between cursor-pointer">
                    <span>Qty: 1</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 10 6"
                      fill="currentColor"
                      className="w-2 h-2 text-gray-600 ml-1"
                    >
                      <path d="M0 0L5 6L10 0H0Z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-900">Rs. 750</span>

                  <span className="line-through text-[#7e818c]">₹1500</span>

                  <span className="font-normal text-[#ff905a]">(70% OFF)</span>
                </div>
                <div className="flex items-center gap-2 text-sm my-1">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#282C3F] fill-current"
                  >
                    <path
                      d="M6.63639 6.99013C6.84386 7.1976 6.84386 7.53397 6.63639 7.74143L5.7725 8.60533H8.27232C9.21251 8.60533 9.97949 7.84333 9.97949 6.89824C9.97949 5.95914 9.21859 5.19824 8.27949 5.19824H6.89116C6.59776 5.19824 6.35991 4.96039 6.35991 4.66699C6.35991 4.37359 6.59776 4.13574 6.89116 4.13574H8.27949C9.80539 4.13574 11.042 5.37234 11.042 6.89824C11.042 8.43232 9.79722 9.66783 8.27241 9.66783H5.77242L6.63639 10.5318C6.84386 10.7393 6.84386 11.0756 6.63639 11.2831C6.42893 11.4906 6.09256 11.4906 5.88509 11.2831L4.11426 9.51227C4.0417 9.43971 3.99452 9.35138 3.97271 9.25831C3.96352 9.21922 3.95866 9.17846 3.95866 9.13658C3.95866 9.05996 3.97488 8.98713 4.00407 8.92134C4.02519 8.87367 4.05366 8.82847 4.08949 8.78745C4.09828 8.77738 4.10745 8.76764 4.11697 8.75826L5.88509 6.99013C6.09256 6.78267 6.42893 6.78267 6.63639 6.99013Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.416992 7.50033C0.416992 3.58831 3.58831 0.416992 7.50033 0.416992C11.4123 0.416992 14.5837 3.58831 14.5837 7.50033C14.5837 11.4123 11.4123 14.5837 7.50033 14.5837C3.58831 14.5837 0.416992 11.4123 0.416992 7.50033ZM7.50033 1.47949C4.17511 1.47949 1.47949 4.17511 1.47949 7.50033C1.47949 10.8255 4.17511 13.5212 7.50033 13.5212C10.8255 13.5212 13.5212 10.8255 13.5212 7.50033C13.5212 4.17511 10.8255 1.47949 7.50033 1.47949Z"
                      fill="currentColor"
                    />
                  </svg>
                  <p className="text-[12px] font-bold">
                    14 days{" "}
                    <span className="text-[12px] font-normal">
                      return available
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm my-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    className="w-4 h-3 text-green-600 fill-current"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.775.227A.716.716 0 0 0 8.716.24L3.373 6.015a.09.09 0 0 1-.133 0L1.278 3.91a.716.716 0 0 0-1.059-.001.834.834 0 0 0 0 1.127l2.565 2.742c.14.15.33.223.53.223h.004a.71.71 0 0 0 .53-.23l5.939-6.416A.833.833 0 0 0 9.775.227"
                    />
                  </svg>

                  <p className="text-[12px] font-normal">
                    Delivary between
                    <span className="text-[12px] font-bold">
                      12 May - 14 May
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <PriceSummary setMaxAllowedStep={setMaxAllowedStep} />
    </div>
  );
};
