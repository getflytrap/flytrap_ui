import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AuthRequired = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) {
    // TODO: replace with a spinner?
    return <p>Loading...</p>;
  }
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthRequired;
