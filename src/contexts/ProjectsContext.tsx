import { createContext, useState, useEffect, ReactNode } from "react";
import { getProjectsForUser } from "../services";
import { useAuth } from "../hooks/useAuth";
import { Project } from "../types";
import { useToast } from "@chakra-ui/react";

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
      setTotalPages(data.total_pages);
    } catch {
      // setLoadingError("Failed to load projects");
      toast({ title: "Failed to load projects", status: "error" });
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
