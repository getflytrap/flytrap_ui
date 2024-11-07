import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";

import { AuthContext } from "./contexts/auth-context";
import { useAuth } from "./hooks/auth-hook";
import ErrorDashboardLayout from "./errors/pages/ErrorDashboardLayout";
import ErrorDashboard from "./errors/pages/ErrorDashboard";
import ErrorDetails from "./error-details/pages/ErrorDetails";
import Login from "./authentication/pages/Login";
import WarningModal from "./shared/WarningModal";
import RootConsole from "./root_console/pages/RootConsole";
import ManageUsers from "./root_console/pages/ManageUsers";
import AuthRequired from "./authentication/components/AuthRequired";
import MainLayout from "./shared/MainLayout";
import Projects from "./projects/pages/Projects";
import "./App.css";

const App = () => {
  const { token, login, logout } = useAuth();

  const [selectedProject, setSelectedProject] = useState();

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token, login, logout }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<AuthRequired token={token} />} />
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={<Projects setSelectedProject={setSelectedProject} />}
            />
            <Route
              path="/errors"
              element={
                <ErrorDashboardLayout
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                />
              }
            >
              <Route
                index
                element={<ErrorDashboard selectedProject={selectedProject} />}
              />
              <Route
                path=":id"
                element={
                  <ErrorDetails
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                  />
                }
              />
            </Route>
            <Route path="/root-console" element={<RootConsole />} />
            <Route path="/manage-users" element={<ManageUsers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
