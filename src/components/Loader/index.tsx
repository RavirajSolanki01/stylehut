import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

import { RootState } from "../../store";

export const LoaderOverlay: React.FC = () => {
  const isLoading = useSelector((state: RootState) =>
    [
      "cart",
      "profile",
      "address",
      "cart-address",
      "verify-otp",
      "get-profile",
      "get-wishlist",
      "remove-from-wishlist",
      "Add-to-cart",
    ].some((key) => state.loading[key])
  );

  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-50 top-[80px] flex items-center justify-center bg-black opacity-30">
      <CircularProgress size={60} color="secondary" />
    </div>
  );
};
