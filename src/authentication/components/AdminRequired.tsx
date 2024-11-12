import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const AdminRequired = () => {
  const { isRoot } = useAuth();

  if (!isRoot) {
    return <Navigate to="/projects" replace />;
  }

  return <Outlet />;
};

export default AdminRequired;