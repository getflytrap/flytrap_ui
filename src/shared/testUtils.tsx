import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { ProjectsProvider } from "../contexts/ProjectsContext";
import { render } from "@testing-library/react";

export function renderWithAllWrappers(component: JSX.Element) {
  render(
    <ChakraProvider>
      <BrowserRouter>
        <AuthProvider>
          <ProjectsProvider>{component}</ProjectsProvider>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
