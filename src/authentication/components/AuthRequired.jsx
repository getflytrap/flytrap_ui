import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRequired = ({ access_token }) => {
  //   return token ? <Outlet /> : <Navigate to="/login" />; TEMPORARILY DISABLED
  return <Outlet />;
};

export default AuthRequired;
