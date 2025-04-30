import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { RootState } from "../../store";

export const LoaderOverlay: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black opacity-30">
      <CircularProgress size={60} color="secondary" />
    </div>
  );
};
