import { createContext, useState, useEffect, ReactNode } from "react";
import { getProjectsForUser } from "../services/users/users";
import { useAuth } from "../hooks/useAuth";
import { Project } from "../types";
import { useToast } from "@chakra-ui/react";
import { eventBus } from "../hooks/eventBus";
import { WebSocketDataType } from "../types";

const PROJECT_LIMIT_PER_PAGE = 10;

/**
 * ProjectsContextType defines the shape of the projects context,
 * providing state and actions for managing projects.
 */
interface ProjectsContextType {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  fetchProjectsForUser: (page?: number) => Promise<void>;
  selectProject: (uuid: string | null) => void;
  selectedProject: Project | null;
}

/**
 * Context for managing projects-related state and actions.
 */
export const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined,
);

/**
 * Provider component for ProjectsContext.
 * Manages project data, pagination, loading state, and WebSocket notifications.
 */
export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const { userUuid } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const toast = useToast();

  /**
   * Automatically fetch projects on initial render.
   */
  useEffect(() => {
    fetchProjectsForUser();
  }, []);

  /**
   * Updates the project issue count when a new notification is received.
   */
  useEffect(() => {
    const handleNewNotification = (data: WebSocketDataType) => {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.uuid === data.project_uuid
            ? { ...project, issue_count: project.issue_count + 1 }
            : project,
        ),
      );
    };

    eventBus.on("newIssueNotification", handleNewNotification);

    return () => {
      eventBus.off("newIssueNotification", handleNewNotification);
    };
  }, [setProjects]);

  /**
   * Fetches the list of projects for the current user.
   * Handles pagination and error scenarios.
   */
  const fetchProjectsForUser = async (page: number = 1) => {
    setIsLoading(true);
    try {
      const data = await getProjectsForUser(
        userUuid,
        page,
        PROJECT_LIMIT_PER_PAGE,
      );
      setProjects(data.projects || []);
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while fetching projects.";
      toast({
        title: "Error Loading Projects",
        description: errorMessage,
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Selects a project by its UUID and updates the selected project state.
   */
  const selectProject = (projectUuid: string | null) => {
    const project = projects.find((p) => p.uuid === projectUuid) || null;
    setSelectedProject(project);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        currentPage,
        totalPages,
        isLoading,
        fetchProjectsForUser,
        selectProject,
        selectedProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
