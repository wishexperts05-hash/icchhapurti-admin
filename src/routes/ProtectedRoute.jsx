import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminAuthState, subAdminAuthState } from "../state/auth/authenticatedState";

const ProtectedRoute = () => {
  const isAuthenticated = useRecoilValue(adminAuthState).isAuthenticated;
  const isSubAdminAuthenticated = useRecoilValue(subAdminAuthState).isAuthenticated;
  const token = sessionStorage.getItem("token");

  if (!isAuthenticated && !token && !isSubAdminAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
