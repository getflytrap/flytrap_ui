import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import { ProjectsProvider } from "../../contexts/ProjectsContext";
import ReactSetup from "./ReactSetup";

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

describe("ReactSetup component", () => {
  it("ReactSetup component renders properly", () => {
    renderWithAllWrappers(<ReactSetup apiKey="123" />);

    const Heading = screen.getByText("Configure React SDK");

    expect(Heading).toBeInTheDocument();
  });
});
