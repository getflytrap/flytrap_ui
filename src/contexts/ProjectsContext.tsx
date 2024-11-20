import { createContext, useState, useEffect, ReactNode } from "react";
import { getProjectsForUser } from "../services/users/users";
import { useAuth } from "../hooks/useAuth";
import { Project } from "../types";
import { useToast } from "@chakra-ui/react";
import { eventBus } from "../hooks/eventBus";
import { WebSocketDataType } from "../types";

const PROJECT_LIMIT_PER_PAGE = 10;

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

export const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined,
);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const { userUuid } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // const [loadingError, setLoadingError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    // Event listener to handle new notifications
    const handleNewNotification = (data: WebSocketDataType) => {
      setProjects((prevProjects) => {
        const newProjects = prevProjects.slice();
        newProjects.map((project) => {
          if (project.uuid === data.project_uuid) {
            project.issue_count += 1;
          } else {
            return project;
          }
        });
        return newProjects;
      });
    };

    eventBus.on("newIssueNotification", handleNewNotification);

    return () => {
      eventBus.off("newIssueNotification", handleNewNotification);
    };
  }, [setProjects]);

  const fetchProjectsForUser = async (page: number = 1) => {
    setIsLoading(true);
    // setLoadingError(null);
    try {
      const { data } = await getProjectsForUser(
        userUuid,
        page,
        PROJECT_LIMIT_PER_PAGE,
      );
      setProjects(data.projects);
      setCurrentPage(data.current_page);
      setTotalPages(data.total_pages || 1);
    } catch {
      // setLoadingError("Failed to load projects");
      toast({
        title: "Failed to load projects",
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

  const selectProject = (projectUuid: string | null) => {
    const project = projects.find((p) => p.uuid === projectUuid) || null;
    setSelectedProject(project);
  };

  useEffect(() => {
    fetchProjectsForUser();
  }, []);

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
