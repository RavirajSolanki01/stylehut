import { Dialog, styled, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
interface SizeModalProps {
  openSizeDialog: boolean;
  selectedProduct: { [key: string]: any };
  selectedSize: number;
  setSelectedSize: (quantity: number) => void;
  handleCloseSizeDialog: () => void;
  handleDoneClick: () => void;
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
            fontSize: "12px",
          })}
          onClick={handleCloseSizeDialog}
        >
          <CloseIcon />
        </StyledIconButton>
        <div className="p-5 m-2">
          <div className="flex">
            <div>
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
              {Array.isArray(selectedProduct?.size_quantities) &&
                selectedProduct?.size_quantities.map(
                  (sizeInfo: { [key: string]: any }) => {
                    const isSelected = selectedSize === sizeInfo.id;
                    return (
                      <div className="relative w-[50px]" key={sizeInfo.id}>
                        <button
                          onClick={() =>
                            sizeInfo.quantity !== 0 &&
                            setSelectedSize(sizeInfo.id)
                          }
                          className={`${
                            sizeInfo.quantity === 0
                              ? "size-button-disabled"
                              : ""
                          }  ${
                            isSelected ? "!border-[#3880FF]" : ""
                          } size-button-default`}
                        >
                          {sizeInfo?.size_data?.size || ""}
                        </button>
                        {sizeInfo.quantity <= 3 && sizeInfo.quantity !== 0 ? (
                          <span className="size-left-item leading-[15px]">
                            {sizeInfo.quantity} left
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
                  }
                )}
            </div>
          </div>

          <div className="flex items-center text-xs sm:text-sm font-semibold my-2 ">
            <button
              type="submit"
              disabled={!selectedSize}
              onClick={handleCloseSizeDialog}
              className="cursor-pointer bg-[#3880FF] disabled:bg-[#3880FF9b] text-center px-[12px] w-full py-[12px] 
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
