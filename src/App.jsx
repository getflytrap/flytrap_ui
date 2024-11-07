import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { useAuth } from "./hooks/auth-hook";
import { AuthContext } from "./contexts/auth-context";

function App() {
  const { token, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token, login, logout }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Heading>Hello!</Heading>} />
          <Route path="/login" element={<Heading>Login Page</Heading>} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
