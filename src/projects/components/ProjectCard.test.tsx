import { render, screen } from "@testing-library/react";
import ProjectCard from "./ProjectCard";
import { describe, it, vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AuthProvider } from "../../contexts/AuthContext";
import { ProjectsProvider } from "../../contexts/ProjectsContext";
import { useNavigate } from "react-router-dom";

vi.mock("../../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

const useAuthMocked = vi.mocked(useAuth, true);

const mockProject = {
  uuid: "123",
  name: "Project 1",
  issue_count: 5,
  platform: "Flask",
  api_key: "123",
};

// user is root user for all below tests
useAuthMocked.mockReturnValue({
  isRoot: true,
  isLoggedIn: true,
  userUuid: "123",
  name: "test",
  login: () => {},
  logout: () => {},
  loading: false,
});

// required for histogram
vi.mock("react-chartjs-2", () => ({
  Bar: () => <div>Mocked Bar Chart</div>,
  Line: () => <div>Mocked Line Chart</div>,
}));

const mockOnEditOpen = vi.fn();
const mockOnDeleteOpen = vi.fn();

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

describe("ProjectCard component", () => {
  it("project card renders properly", () => {
    renderWithAllWrappers(
      <ProjectCard
        project={mockProject}
        onEditOpen={mockOnEditOpen}
        onDeleteOpen={mockOnDeleteOpen}
      />
    );

    const projectHeading = screen.getByText("Project 1");
    const issueCount = screen.getByText("Total Issues: 5");
    expect(projectHeading).toBeInTheDocument();
    expect(issueCount).toBeInTheDocument();
  });

  it("Edit button triggers execution of onEditOpen function", async () => {
    renderWithAllWrappers(
      <ProjectCard
        project={mockProject}
        onEditOpen={mockOnEditOpen}
        onDeleteOpen={mockOnDeleteOpen}
      />
    );

    const user = userEvent.setup();
    const editButton = screen.getByRole("button", {
      name: /edit/i,
    });

    await user.click(editButton);

    expect(mockOnEditOpen).toHaveBeenCalledTimes(1);
  });

  it("Delete button triggers execution of onDeleteOpen function", async () => {
    renderWithAllWrappers(
      <ProjectCard
        project={mockProject}
        onEditOpen={mockOnEditOpen}
        onDeleteOpen={mockOnDeleteOpen}
      />
    );

    const user = userEvent.setup();
    const deleteButton = screen.getByRole("button", {
      name: /delete/i,
    });

    await user.click(deleteButton);

    expect(mockOnDeleteOpen).toHaveBeenCalledTimes(1);
  });
});
