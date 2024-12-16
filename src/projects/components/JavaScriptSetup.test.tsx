import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import { ProjectsProvider } from "../../contexts/ProjectsContext";
import JavaScriptSetup from "./JavaScriptSetup";

function renderWithAllWrappers(component: JSX.Element) {
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

describe("JavaScriptSetup component", () => {
  it("JavaScriptSetup component renders properly", () => {
    renderWithAllWrappers(<JavaScriptSetup apiKey="123" />);

    const Heading = screen.getByText("Configure JavaScript SDK");

    expect(Heading).toBeInTheDocument();
  });
});
