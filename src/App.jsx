import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";

import { AuthContext } from "./contexts/auth-context";
import ErrorDashboard from "./errors/pages/ErrorDashboard";
import ErrorDisplay from "./errors/pages/ErrorDisplay";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUuid, setUserUuid] = useState(null);


  const login = (uuid) => {
    setUserUuid(uuid);
    setIsLoggedIn(true);
  }
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userUuid, login, logout }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* <Route element={<AuthRequired/>} /> */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Projects />} />
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
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
