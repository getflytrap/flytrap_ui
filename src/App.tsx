import { Routes, Route, Outlet } from "react-router-dom";
import { ProjectsProvider } from "./contexts/ProjectsContext";
import LandingPage from "./landing/pages/LandingPage.tsx";
import Login from "./authentication/pages/Login.tsx";
import MainLayout from "./shared/MainLayout.tsx";
import AuthRequired from "./authentication/components/AuthRequired.tsx";
import Projects from "./projects/pages/Projects";
import ProjectSetup from "./projects/pages/ProjectSetup.tsx";
import ErrorDashboard from "./errors/pages/ErrorDashboard.tsx";
import ErrorDisplay from "./errors/pages/ErrorDisplay.tsx";
import ErrorDetails from "./error-details/pages/ErrorDetails.tsx";
import RejectionDetails from "./error-details/pages/RejectionDetails.tsx";
import AdminRequired from "./authentication/components/AdminRequired.tsx";
import ManageUsers from "./root_console/pages/ManageUsers.tsx";
import ChangePassword from "./authentication/pages/ChangePassword.tsx";
import NotFound from "./shared/NotFound.tsx";

/**
 * Application routes configuration.
 * Defines the structure and hierarchy of all routes, including authentication and role-based access.
 */
const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />

      {/* Protected Routes */}
      <Route element={<AuthRequired />}>
        <Route element={<MainLayout />}>
          <Route
            element={
              <ProjectsProvider>
                <Outlet />
              </ProjectsProvider>
            }
          >
            <Route path="/projects" element={<Projects />} />
            <Route
              path="/projects/:project_uuid/setup"
              element={<ProjectSetup />}
            ></Route>
            <Route
              path="/projects/:project_uuid/issues"
              element={<ErrorDashboard />}
            >
              <Route index element={<ErrorDisplay />} />
              <Route path="errors/:error_uuid" element={<ErrorDetails />} />
              <Route
                path="rejections/:rejection_uuid"
                element={<RejectionDetails />}
              />
            </Route>
          </Route>
          <Route element={<AdminRequired />}>
            <Route path="/root-console" element={<ManageUsers />} />
          </Route>
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
