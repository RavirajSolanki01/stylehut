import { Navigate } from "react-router-dom";
import React from "react";


export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));

  return isAuthenticated ? (
    <Navigate to="/home" replace />
  ) : (
    <>
      <div>{children}</div>
    </>
  );
};
