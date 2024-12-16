import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { act } from "@testing-library/react";
import { AuthProvider } from "../../contexts/AuthContext";
import { ProjectsProvider } from "../../contexts/ProjectsContext";
import ErrorDashboard from "./ErrorDashboard";

describe("ErrorDashboard", () => {
  it("renders the sidebar", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <ProjectsProvider>
              <ErrorDashboard />
            </ProjectsProvider>
          </AuthProvider>
        </BrowserRouter>
      );
    });

    const sidebar = screen.getByRole("complementary", { name: "aside" });
    expect(sidebar).toBeInTheDocument();
  });

  it("renders the main content area", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <ProjectsProvider>
              <ErrorDashboard />
            </ProjectsProvider>
          </AuthProvider>
        </BrowserRouter>
      );
    });

    const mainContent = screen.getByRole("main");
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveStyle("flex: 1");
  });
});
