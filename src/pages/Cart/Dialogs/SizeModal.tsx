import { Dialog, styled, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { PRODUCT_DETAIL_CONSTANTS } from "../../../utils/constants";

interface SizeModalProps {
  openSizeDialog: boolean;
  handleCloseSizeDialog: () => void;
}

export const SizeModal: React.FC<SizeModalProps> = ({
  openSizeDialog,
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
        <div className="p-4 pb-0">
        <div className="flex flex-wrap gap-[10px] mb-[10px] p-6">
            {PRODUCT_DETAIL_CONSTANTS.SIZE.map((sizeInfo) => (
              <div className="relative w-[50px]" key={sizeInfo.id}>
                <button
                  className={`${
                    sizeInfo.quantity === 0 ? "size-button-disabled" : ""
                  } size-button-default`}
                >
                  {sizeInfo.size}
                </button>
                {sizeInfo.quantity <= 3 && sizeInfo.quantity !== 0 ? (
                  <span className="size-left-item leading-[15px]">2 left</span>
                ) : (
                  <></>
                )}
                {sizeInfo.quantity === 0 ? (
                  <span className="size-strike-show"></span>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>

          <hr className="mt-5 border-gray-300" />

          <div className="flex items-center text-xs sm:text-sm font-semibold my-2 ">
            <button
              type="button"
              onClick={handleCloseSizeDialog}
              className="flex-1 text-xs text-[#636363] p-1 focus:outline-none cursor-pointer uppercase"
            >
              Cancel
            </button>
            <div className="border-l border-gray-300 h-5 mx-2" />
            <button className="flex-1 text-xs uppercase text-[#ff3f6c] p-1 focus:outline-none cursor-pointer">
              Select
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
