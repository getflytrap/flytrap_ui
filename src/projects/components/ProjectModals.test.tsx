import { render, screen } from "@testing-library/react";
import ProjectModals from "./ProjectModals";
import { describe, it, vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AuthProvider } from "../../contexts/AuthContext";
import { ProjectsProvider } from "../../contexts/ProjectsContext";
import { useNavigate } from "react-router-dom";

const mockProject = {
  uuid: "123",
  name: "Project 1",
  issue_count: 5,
  platform: "Flask",
  api_key: "123",
};

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

describe("ProjectModals component", () => {
  it("New project modal renders properly", () => {
    renderWithAllWrappers(
      <ProjectModals
        isNewProjectOpen={true}
        onNewProjectClose={() => {}}
        isEditOpen={false}
        onEditClose={() => {}}
        isDeleteOpen={false}
        onDeleteClose={() => {}}
      />
    );

    const projectName = screen.getByText("Project Name");
    const choosePlatform = screen.getByText("Choose Your Platform:");

    expect(projectName).toBeInTheDocument();
    expect(choosePlatform).toBeInTheDocument();
  });

  it("Edit project modal renders properly", () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <AuthProvider>
            <ProjectsProvider>
              <ProjectModals
                isNewProjectOpen={false}
                onNewProjectClose={() => {}}
                isEditOpen={true}
                onEditClose={() => {}}
                isDeleteOpen={false}
                onDeleteClose={() => {}}
              />
            </ProjectsProvider>
          </AuthProvider>
        </BrowserRouter>
      </ChakraProvider>
    );

    const Heading = screen.getByText("Edit Project Name");
    const submitButton = screen.getByText("Submit");

    expect(Heading).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("Delete project modal renders properly", () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <AuthProvider>
            <ProjectsProvider>
              <ProjectModals
                isNewProjectOpen={false}
                onNewProjectClose={() => {}}
                isEditOpen={false}
                onEditClose={() => {}}
                isDeleteOpen={true}
                onDeleteClose={() => {}}
              />
            </ProjectsProvider>
          </AuthProvider>
        </BrowserRouter>
      </ChakraProvider>
    );

    const Heading = screen.getByText("Confirm Deletion");
    const confirmButton = screen.getByText("Confirm Delete Project");

    expect(Heading).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
  });
});
