import React from "react";
import { Dialog } from "@mui/material";

type ConfirmDeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
};

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Delete Confirmation",
  description = "Are you sure you want to delete this address?",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <div>
        <h2
          id="confirm-dialog-title"
          className="text-lg font-semibold px-6 pt-6"
        >
          {title}
        </h2>
        <p
          id="confirm-dialog-description"
          className="text-sm text-gray-600 mt-2 px-6"
        >
          {description}
        </p>

        <hr className="mt-10 border-gray-300" />

        <div className="flex items-center text-sm font-semibold my-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 text-[#636363] p-1 focus:outline-none cursor-pointer uppercase"
          >
            Cancel
          </button>
          <div className="border-l border-gray-300 h-5 mx-2" />
          <button
            onClick={onConfirm}
            className="flex-1 uppercase text-[#3880FF] p-1 focus:outline-none cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
