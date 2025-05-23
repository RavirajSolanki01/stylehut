import { Dialog, styled, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

import { PRODUCT_DETAIL_CONSTANTS } from "../../../utils/constants";
interface QuantityModalProps {
  openQuantityDialog: boolean;
  selectedQuantity: number;
  setSelectedQuantity: (quantity: number) => void;
  handleCloseQuantityDialog: () => void;
}

export const QuantityModal: React.FC<QuantityModalProps> = ({
  openQuantityDialog,
  selectedQuantity,
  setSelectedQuantity,
  handleCloseQuantityDialog,
}) => {
  return (
    <div>
      <Dialog
        open={openQuantityDialog}
        onClose={handleCloseQuantityDialog}
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
          onClick={handleCloseQuantityDialog}
        >
          <CloseIcon />
        </StyledIconButton>
        <div className="p-5">
          <div className="flex flex-col gap-[10px] max-w-[300px]">
            <p className="text-[14px] font-bold my-2">Select Quantity</p>
            <hr className="mb-2 border-gray-300" />

            <div className="flex flex-wrap gap-[10px] mb-[20px]">
              {PRODUCT_DETAIL_CONSTANTS.QUANTITY.map((quantityInfo) => {
                const isSelected = selectedQuantity === quantityInfo.quantity;
                return (
                  <div className="relative w-[50px]" key={quantityInfo.id}>
                    <button
                      onClick={() =>
                        quantityInfo.quantity !== 0 &&
                        setSelectedQuantity(quantityInfo.quantity as number)
                      }
                      className={`size-button-default ${isSelected ? "!border-[#3880FF]" : ""} ${
                        quantityInfo.quantity === 0
                          ? "size-button-disabled cursor-not-allowed"
                          : "cursor-pointer hover:border-[#3880FF]"
                      }`}
                    >
                      {quantityInfo.quantity}
                    </button>

                    {quantityInfo.quantity === 0 ? (
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
              onClick={handleCloseQuantityDialog}
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
  color: "#3880FF",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  },
});
