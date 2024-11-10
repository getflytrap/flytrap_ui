import { Routes, Route, Navigate } from "react-router-dom";
import ErrorDashboard from "./errors/pages/ErrorDashboard.tsx";
import ErrorDisplay from "./errors/pages/ErrorDisplay.tsx";
import ErrorDetails from "./error-details/pages/ErrorDetails.tsx";
import Login from "./authentication/pages/Login.tsx";
// import WarningModal from "./shared/WarningModal";
import RootConsole from "./root_console/pages/RootConsole.tsx";
import ManageUsers from "./root_console/pages/ManageUsers.tsx";
import AuthRequired from "./authentication/components/AuthRequired.tsx";
import MainLayout from "./shared/MainLayout.tsx";
import Projects from "./projects/pages/Projects.tsx";
import ChangePassword from "./authentication/pages/ChangePassword.tsx";
import "./App.css";

const App = () => {


  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AuthRequired/>}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/errors" element={<ErrorDashboard />}>
            <Route index element={<ErrorDisplay />} />
            <Route
              path=":pid/error/:eid"
              element={
                <ErrorDetails
                // selectedProject={selectedProject}
                // setSelectedProject={setSelectedProject}
                />
              }
            />
          </Route>
          <Route path="/root-console" element={<RootConsole />} />
          <Route path="/manage-users" element={<ManageUsers />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
