import { useContext } from "react";
import { Box, Heading, Button, useDisclosure } from "@chakra-ui/react";
import ProjectList from "../components/ProjectList";
import PaginationControls from "../../shared/Pagination";
import LoadingSpinner from "../../shared/LoadingSpinner";
import ProjectModals from "../components/ProjectModals";
import { useProjects } from "../../hooks/useProjects";
import { AuthContext } from "../../contexts/AuthContext";

const Projects = () => {
  const {
    projects,
    currentPage,
    totalPages,
    isLoading,
    fetchProjectsForUser,
    selectProject,
  } = useProjects();

  const { isRoot } = useContext(AuthContext);

  // Modal controls
  const {
    isOpen: isEditOpen,
    onOpen: openEdit,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: openDelete,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isNewProjectOpen,
    onOpen: onNewProjectOpen,
    onClose: onNewProjectClose,
  } = useDisclosure();

  const onEditOpen = (projectUuid: string) => {
    selectProject(projectUuid);
    openEdit();
  };

  const onDeleteOpen = (projectUuid: string) => {
    selectProject(projectUuid);
    openDelete();
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box bg="gray.100" borderRadius="20px">
      <Heading my="40px">Active Projects:</Heading>
      {isRoot && (
        <Button onClick={onNewProjectOpen} size="lg" mb="30px" bg="green.400">
          Start A New Project
        </Button>
      )}

      <ProjectList
        projects={projects}
        onEditOpen={onEditOpen}
        onDeleteOpen={onDeleteOpen}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={() => fetchProjectsForUser(currentPage - 1)}
        onNextPage={() => fetchProjectsForUser(currentPage + 1)}
      />

      <ProjectModals
        isNewProjectOpen={isNewProjectOpen}
        onNewProjectClose={onNewProjectClose}
        isEditOpen={isEditOpen}
        onEditClose={onEditClose}
        isDeleteOpen={isDeleteOpen}
        onDeleteClose={onDeleteClose}
      />
    </Box>
  );
};

export default Projects;
