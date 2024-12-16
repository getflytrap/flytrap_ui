import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import { ProjectsProvider } from "../../contexts/ProjectsContext";
import FlaskSetup from "./FlaskSetup";

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

describe("FlaskSetup component", () => {
  it("FlaskSetup component renders properly", () => {
    renderWithAllWrappers(<FlaskSetup apiKey="123" />);

    const Heading = screen.getByText("Configure Flask SDK");

    expect(Heading).toBeInTheDocument();
  });
});
