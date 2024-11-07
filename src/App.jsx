import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Heading>Hello!</Heading>} />
        <Route path="/login" element={<Heading>Login Page</Heading>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
