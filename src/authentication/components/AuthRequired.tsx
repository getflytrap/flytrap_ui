import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../shared/LoadingSpinner";

const AuthRequired = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) {
    return <LoadingSpinner />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthRequired;
