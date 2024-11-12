import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import ErrorDashboard from "./errors/pages/ErrorDashboard.tsx";
import ErrorDisplay from "./errors/pages/ErrorDisplay.tsx";
import ErrorDetails from "./error-details/pages/ErrorDetails.tsx";
import RejectionDetails from "./error-details/pages/RejectionDetails.tsx";
import Login from "./authentication/pages/Login.tsx";
// import WarningModal from "./shared/WarningModal";
import RootConsole from "./root_console/pages/RootConsole.tsx";
import ManageUsers from "./root_console/pages/ManageUsers.tsx";
import AuthRequired from "./authentication/components/AuthRequired.tsx";
import MainLayout from "./shared/MainLayout.tsx";
import { ProjectsProvider } from "./contexts/ProjectsContext";
import Projects from "./projects/pages/Projects";
import ChangePassword from "./authentication/pages/ChangePassword.tsx";
import ProjectSetup from "./projects/pages/ProjectSetup.tsx";

import AdminRequired from "./authentication/components/AdminRequired.tsx";
import "./App.css"; 

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AuthRequired />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/projects" replace />} />
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
            <Route path="/root-console" element={<RootConsole />} />
          </Route>
          <Route path="/root-console" element={<RootConsole />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
