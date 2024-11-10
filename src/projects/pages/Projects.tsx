import { useState } from "react";
import { Box, Heading, Button, useDisclosure } from "@chakra-ui/react";
import ProjectList from "../components/ProjectList";
import PaginationControls from "../components/Pagination";
import LoadingSpinner from "../../shared/LoadingSpinner";
import ProjectModals from "../components/ProjectModals";
// import WarningModal from "../../shared/WarningModal";
import { useProjects } from "../../hooks/useProjects";

const Projects = () => {
  const {
    projects,
    currentPage,
    totalPages,
    isLoading,
    fetchProjectsForUser,
  } = useProjects();

  const [selectedProjectUuid, setSelectedProjectUuid] = useState<string | null>(null);

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
    setSelectedProjectUuid(projectUuid);
    openEdit();
  };

  const onDeleteOpen = (projectUuid: string) => {
    setSelectedProjectUuid(projectUuid);
    openDelete();
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box>
      <Button onClick={onNewProjectOpen}>Start A New Project</Button>
      <Heading mb="40px">Active Projects:</Heading>
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
        selectedProjectUuid={selectedProjectUuid}
      />
    </Box>
  );
}

export default Projects;