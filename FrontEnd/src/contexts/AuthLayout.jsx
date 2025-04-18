import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthLayout = () => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

export default AuthLayout;
