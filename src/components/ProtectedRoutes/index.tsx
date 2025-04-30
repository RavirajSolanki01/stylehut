import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  children,
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
      <Header />
      <div className="header-less-content">{children}</div>
    </>
  );
};
