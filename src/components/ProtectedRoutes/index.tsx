import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
  path?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  children,
  path,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <>
      {path === "cart" ? null : <Header />}
      <div className="header-less-content">{children}</div>
    </>
  );
};
