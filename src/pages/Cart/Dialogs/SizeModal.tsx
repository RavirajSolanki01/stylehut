import { Dialog, styled, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

import { PRODUCT_DETAIL_CONSTANTS } from "../../../utils/constants";
import { Product } from "../../../utils/types";
interface SizeModalProps {
  openSizeDialog: boolean;
  selectedProduct: Product;
  selectedSize: string;
  setSelectedSize: (quantity: string) => void;
  handleCloseSizeDialog: () => void;
}

export const SizeModal: React.FC<SizeModalProps> = ({
  openSizeDialog,
  selectedProduct,
  selectedSize,
  setSelectedSize,
  handleCloseSizeDialog,
}) => {
  return (
    <div>
      <Dialog
        open={openSizeDialog}
        onClose={handleCloseSizeDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <StyledIconButton
          aria-label="close"
          sx={() => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: "#282c3f",
            fontSize: "16px",
          })}
          onClick={handleCloseSizeDialog}
        >
          <CloseIcon />
        </StyledIconButton>
        <div className="p-5">
          <div className="flex">
            <div className="">
              <img
                src={selectedProduct?.image[0]}
                alt={selectedProduct?.name}
                className="object-cover max-w-[70px] w-full max-h-[70px] h-full"
              />
            </div>
            <div className="pl-3">
              <p className="text-xs sm:text-sm">{selectedProduct?.name}</p>
              <p className="text-xs sm:text-sm font-normal text-[#535766]">
                {selectedProduct?.description}
              </p>
              <div className="flex items-center gap-2 mt-3 text-xs sm:text-sm justify-center sm:justify-start">
                <span className="text-gray-900">
                  Rs.
                  {(
                    Number(selectedProduct?.price) -
                    Number(selectedProduct?.price) *
                      (selectedProduct?.discount / 100)
                  ).toFixed(0)}
                </span>

                <span className="line-through text-[#7e818c] text-xs sm:text-sm">
                  ₹{Number(selectedProduct?.price).toFixed(0)}
                </span>

                <span className="font-normal text-[#ff905a] text-xs sm:text-sm ">
                  ({selectedProduct?.discount}%)
                </span>
              </div>
            </div>
          </div>

          <hr className="mt-5 border-gray-300" />
          <div className="flex flex-col gap-[10px]">
            <p className="text-[#7e818c] text-sm font-bold my-2">Select Size</p>
            <div className="flex flex-wrap gap-[10px] mb-[20px]">
              {PRODUCT_DETAIL_CONSTANTS.SIZE.map((sizeInfo) => {
                const isSelected = selectedSize === sizeInfo.size;
                return (
                  <div className="relative w-[50px]" key={sizeInfo.id}>
                    <button
                      onClick={() =>
                        sizeInfo.quantity !== 0 &&
                        setSelectedSize(sizeInfo.size)
                      }
                      className={`${
                        sizeInfo.quantity === 0 ? "size-button-disabled" : ""
                      }  ${
                        isSelected ? "!border-[#3880FF]" : ""
                      } size-button-default`}
                    >
                      {sizeInfo.size}
                    </button>
                    {sizeInfo.quantity <= 3 && sizeInfo.quantity !== 0 ? (
                      <span className="size-left-item leading-[15px]">
                        2 left
                      </span>
                    ) : (
                      <></>
                    )}
                    {sizeInfo.quantity === 0 ? (
                      <span className="size-strike-show"></span>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center text-xs sm:text-sm font-semibold my-2 ">
            <button
              type="submit"
              onClick={handleCloseSizeDialog}
              className="cursor-pointer bg-[#3880FF] text-center px-[12px] w-full py-[12px] 
            text-[#fff] text-[14px] font-[700] rounded-none uppercase
            focus:outline-none focus:border-none hover:outline-none hover:border-transparent delete-account-buttons"
            >
              Done
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

const StyledIconButton = styled(IconButton)({
  position: "absolute",
  right: 8,
  top: 8,
  color: "#282c3f",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  },
});
