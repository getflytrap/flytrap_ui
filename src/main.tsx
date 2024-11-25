import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import customTheme from "./theme/theme.js";
import ErrorBoundary from "./shared/ErrorBoundary.tsx";
import App from "./App.tsx";

/**
 * Entry point for the React application. 
 * Renders the app within the root element with essential providers and configurations.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={customTheme}>
      <ErrorBoundary fallback={<h1>Something went wrong!</h1>}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ErrorBoundary>
    </ChakraProvider>
  </StrictMode>,
);
