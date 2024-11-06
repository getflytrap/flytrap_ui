import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRequired = ({ token }) => {
  //   return token ? <Outlet /> : <Navigate to="/login" />; TEMPORARILY DISABLED
  return <Outlet />;
};

export default AuthRequired;
