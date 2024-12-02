import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../shared/LoadingSpinner";

/**
 * A higher-order component that ensures only authenticated users can access certain routes.
 * - If the user's authentication status is still loading, it shows a loading spinner.
 * - If the user is not logged in, it redirects them to the `/login` page.
 * - If the user is logged in, it renders the child routes.
 *
 * @returns A loading spinner, redirect to `/login`, or the child routes based on the user's authentication status.
 */
const AuthRequired = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthRequired;
