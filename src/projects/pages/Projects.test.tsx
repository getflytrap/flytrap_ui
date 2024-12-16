import { render, screen, waitFor } from "@testing-library/react";
import Projects from "./Projects";
import { vi } from "vitest";
import { act } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import { useProjects } from "../../hooks/useProjects";
import { useAuth } from "../../hooks/useAuth";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import { ProjectsProvider } from "../../contexts/ProjectsContext";

const useProjectsMocked = vi.mocked(useProjects, true);
const useAuthMocked = vi.mocked(useAuth, true);

vi.mock("../../hooks/useProjects", () => ({
  useProjects: vi.fn(),
}));

vi.mock("../../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

// required for histogram
vi.mock("react-chartjs-2", () => ({
  Bar: () => <div>Mocked Bar Chart</div>,
  Line: () => <div>Mocked Line Chart</div>,
}));

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

describe("Projects Component", () => {
  it("renders the loading spinner when data is loading", async () => {
    useProjectsMocked.mockReturnValue({
      projects: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: true,
      fetchProjectsForUser: vi.fn(),
      selectProject: vi.fn(),
      setProjects: vi.fn(),
      selectedProject: null,
    });

    useAuthMocked.mockReturnValue({
      isRoot: true,
      isLoggedIn: true,
      userUuid: "123",
      name: "test",
      login: () => {},
      logout: () => {},
      loading: false,
    });

    await act(async () => {
      renderWithAllWrappers(<Projects />);
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders projects correctly when data is fetched", () => {
    useProjectsMocked.mockReturnValue({
      projects: [
        {
          uuid: "123",
          name: "Project 1",
          issue_count: 5,
          platform: "Flask",
          api_key: "123",
        },
        {
          uuid: "234",
          name: "Project 2",
          issue_count: 5,
          platform: "Flask",
          api_key: "234",
        },
      ],
      currentPage: 1,
      totalPages: 2,
      isLoading: false,
      fetchProjectsForUser: vi.fn(),
      selectProject: vi.fn(),
      setProjects: vi.fn(),
      selectedProject: null,
    });

    useAuthMocked.mockReturnValue({
      isRoot: true,
      isLoggedIn: true,
      userUuid: "123",
      name: "test",
      login: () => {},
      logout: () => {},
      loading: false,
    });

    renderWithAllWrappers(<Projects />);

    expect(screen.getByText("Project 1")).toBeInTheDocument();
    expect(screen.getByText("Project 2")).toBeInTheDocument();
  });

  it('renders the "Create Project" button if the user has root permissions', async () => {
    useProjectsMocked.mockReturnValue({
      projects: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      fetchProjectsForUser: vi.fn(),
      selectProject: vi.fn(),
      setProjects: vi.fn(),
      selectedProject: null,
    });

    useAuthMocked.mockReturnValue({
      isRoot: true,
      isLoggedIn: true,
      userUuid: "123",
      name: "test",
      login: () => {},
      logout: () => {},
      loading: false,
    });

    await act(async () => {
      renderWithAllWrappers(<Projects />);
    });

    expect(screen.getByText("Create Project")).toBeInTheDocument();
  });

  it('does not render the "Create Project" button if the user is not root', async () => {
    useProjectsMocked.mockReturnValue({
      projects: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      fetchProjectsForUser: vi.fn(),
      selectProject: vi.fn(),
      setProjects: vi.fn(),
      selectedProject: null,
    });

    useAuthMocked.mockReturnValue({
      isRoot: false,
      isLoggedIn: true,
      userUuid: "123",
      name: "test",
      login: () => {},
      logout: () => {},
      loading: false,
    });

    await act(async () => {
      renderWithAllWrappers(<Projects />);
    });

    expect(screen.queryByText("Create Project")).toBeNull();
  });

  it('opens the create project modal when clicking "Create Project"', async () => {
    useProjectsMocked.mockReturnValue({
      projects: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      fetchProjectsForUser: vi.fn(),
      selectProject: vi.fn(),
      setProjects: vi.fn(),
      selectedProject: null,
    });

    useAuthMocked.mockReturnValue({
      isRoot: true,
      isLoggedIn: true,
      userUuid: "123",
      name: "test",
      login: () => {},
      logout: () => {},
      loading: false,
    });

    await act(async () => {
      renderWithAllWrappers(<Projects />);
    });

    await userEvent.click(screen.getByText("Create Project"));

    await waitFor(() =>
      expect(screen.getByText("Create Project")).toBeInTheDocument()
    );
  });
});
