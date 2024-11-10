import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/auth-context";

const AuthRequired = () => {
  const auth = useContext(AuthContext);

  if (auth?.isLoggedIn === null) {
    return <p>Loading...</p>; // Optionally replace with a spinner
  }
  console.log('is logged in: ', auth?.isLoggedIn)
  
  if (!auth?.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthRequired;
