import { createContext, useState, useEffect, ReactNode } from "react";
import { getProjectsForUser, renameProject, deleteProject, createProject } from "../services";
import { useAuth } from "../hooks/useAuth";
import { Project } from "../types";
import { useToast } from "@chakra-ui/react";

type ProjectsContextType = {
  projects: Project[];
  currentPage: number;
  totalPages: number;
  fetchProjectsForUser: (page?: number) => Promise<void>;
  handleEditSubmit: (id: string, name: string) => Promise<void>;
  handleConfirmDeletion: (id: string) => Promise<void>;
  handleNewProjectSubmit: (name: string) => Promise<void>;
};

export const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const { userUuid } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();

  const fetchProjectsForUser = async (page: number = 1) => {
    try {
      const { data } = await getProjectsForUser(userUuid, page, 10);
      setProjects(data.projects);
      setCurrentPage(data.current_page);
      setTotalPages(data.total_pages);
    } catch {
      toast({ title: "Failed to load projects", status: "error" });
    }
  };

  const handleEditSubmit = async (id: string, newName: string) => {
    try {
      await renameProject(id, newName);
      setProjects((prev) => prev.map((p) => (p.uuid === id ? { ...p, name: newName } : p)));
      toast({ title: "Project renamed", status: "success" });
    } catch {
      toast({ title: "Error renaming project", status: "error" });
    }
  };

  const handleConfirmDeletion = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.uuid !== id));
      toast({ title: "Project deleted", status: "success" });
    } catch {
      toast({ title: "Error deleting project", status: "error" });
    }
  };

  const handleNewProjectSubmit = async (name: string) => {
    if (name.length < 8) {
      toast({ title: "Project name must be at least 8 characters", status: "error" });
      return;
    }
    try {
      const { data } = await createProject(name);
      setProjects((prev) => [...prev, { uuid: data.uuid, name: data.name, issue_count: 0 }]);
      toast({ title: "Project created", status: "success" });
    } catch {
      toast({ title: "Error creating project", status: "error" });
    }
  };

  useEffect(() => {
    fetchProjectsForUser();
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        currentPage,
        totalPages,
        fetchProjectsForUser,
        handleEditSubmit,
        handleConfirmDeletion,
        handleNewProjectSubmit,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
