import { Dialog, styled, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ConfirmLogoutModalProps {
  openConfirmDialog: boolean;
  handleCloseConfirmDialog: () => void;
  handleConfirmLogout: () => void;
}

export const ConfirmLogoutModal: React.FC<ConfirmLogoutModalProps> = ({
  handleCloseConfirmDialog,
  handleConfirmLogout,
  openConfirmDialog,
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
      <div className="pb-0">
        <div className="flex">
          <div>
            <p className="text-sm text-[#3880FF] font-bold px-5 mt-5">
              Confirm Logout
            </p>
            <p className="text-xs sm:text-sm py-4 text-gray-600 px-5 font-normal max-w-[300px]">
              Are you sure you want to Logout?
            </p>
          </div>
        </div>

        <hr className="border-gray-300" />

        <div className="flex items-center text-xs sm:text-sm font-semibold my-2 ">
          <button
            type="button"
            onClick={() => handleCloseConfirmDialog()}
            className="flex-1 text-xs text-[#636363] p-1 focus:outline-none cursor-pointer uppercase"
          >
            Cancel
          </button>
          <div className="border-l border-gray-300 h-5 mx-2" />
          <button
            onClick={() => handleConfirmLogout()}
            className="flex-1 text-xs uppercase text-[#3880FF] p-1 focus:outline-none cursor-pointer"
          >
            Yes, Logout
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
