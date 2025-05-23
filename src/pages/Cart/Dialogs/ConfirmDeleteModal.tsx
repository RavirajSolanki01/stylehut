import { Dialog, styled, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Product } from "../../../utils/types";

interface ConfirmDeleteModalProps {
  openConfirmDialog: boolean;
  selectedProduct: Product;
  handleCloseConfirmDialog: () => void;
  handleConfirmDelete: () => void;
  handleAddToWishlist: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  handleCloseConfirmDialog,
  handleAddToWishlist,
  handleConfirmDelete,
  openConfirmDialog,
  selectedProduct,
}) => {
  return (
    <Dialog
      open={openConfirmDialog}
      onClose={handleCloseConfirmDialog}
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
        onClick={handleCloseConfirmDialog}
      >
        <CloseIcon />
      </StyledIconButton>
      <div className="p-4 pb-0">
        <div className="flex">
          <div className="">
            <img
              src={selectedProduct?.image[0]}
              alt={selectedProduct?.name}
              className="object-cover max-w-[70px] w-full max-h-[70px] h-full"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 font-bold px-3">
              Move from Bag
            </p>
            <p className="text-xs sm:text-sm text-gray-600 px-3 font-normal max-w-[300px]">
              Are you sure you want to move this item from bag?
            </p>
          </div>
        </div>

        <hr className="mt-5 border-gray-300" />

        <div className="flex items-center text-xs sm:text-sm font-semibold my-2 ">
          <button
            type="button"
            onClick={() => handleConfirmDelete()}
            className="flex-1 text-xs text-[#636363] p-1 focus:outline-none cursor-pointer uppercase"
          >
            Remove
          </button>
          <div className="border-l border-gray-300 h-5 mx-2" />
          <button
            onClick={() => handleAddToWishlist()}
            className="flex-1 text-xs uppercase text-[#ff3f6c] p-1 focus:outline-none cursor-pointer"
          >
            Move to wishlist
          </button>
        </div>
      </div>
    </Dialog>
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
