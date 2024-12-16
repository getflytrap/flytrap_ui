import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import { ProjectsProvider } from "../../contexts/ProjectsContext";
import ExpressSetup from "./ExpressSetup";

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

describe("ExpressSetup component", () => {
  it("ExpressSetup component renders properly", () => {
    renderWithAllWrappers(<ExpressSetup apiKey="123" />);

    const Heading = screen.getByText("Configure Express SDK");

    expect(Heading).toBeInTheDocument();
  });
});
