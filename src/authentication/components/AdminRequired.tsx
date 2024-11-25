import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

/**
 * A higher-order component that restricts access to routes for admin users only.
 * If the user is not an admin (`isRoot` is false), they are redirected to the `/projects` page.
 * If the user is an admin, the component renders the child routes.
 *
 * @returns A redirect to `/projects` if the user is not an admin, or renders child routes if they are.
 */
const AdminRequired = () => {
  const { isRoot } = useAuth();

  if (!isRoot) {
    return <Navigate to="/projects" replace />;
  }

  return <Outlet />;
};

export default AdminRequired;
