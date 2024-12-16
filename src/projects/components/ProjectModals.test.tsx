import { render, screen } from "@testing-library/react";
import ProjectModals from "./ProjectModals";
import { describe, it } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import { ProjectsProvider } from "../../contexts/ProjectsContext";
import { renderWithAllWrappers } from "../../shared/testUtils";

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
