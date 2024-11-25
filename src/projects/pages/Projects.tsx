import {
  Box,
  Heading,
  Button,
  useDisclosure,
  Container,
  Flex,
} from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth";
import { useProjects } from "../../hooks/useProjects";
import ProjectList from "../components/ProjectList";
import ProjectModals from "../components/ProjectModals";
import PaginationControls from "../../shared/Pagination";
import LoadingSpinner from "../../shared/LoadingSpinner";

/**
 * Projects component renders the list of projects, pagination controls,
 * and modals for project creation, editing, and deletion.
 */
const Projects = () => {
  const {
    projects,
    currentPage,
    totalPages,
    isLoading,
    fetchProjectsForUser,
    selectProject,
  } = useProjects();

  // Check if the current user has root permissions
  const { isRoot } = useAuth();

  // Modal controls for different actions
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
    <Box bg="gray.100" textAlign={"left"} px={6} overflowY="auto">
      <Container maxWidth="1200px" mx="auto">
        <Flex justifyContent="space-between">
          <Heading as="h2" fontSize="2rem" my="30px">
            Projects
          </Heading>
          {isRoot && (
            <Button
              onClick={onNewProjectOpen}
              leftIcon={<IoAddCircleOutline />}
              size="lg"
              bg="brand.500"
              color="white"
              _hover={{
                bg: "brand.300",
              }}
              my="30px"
            >
              Create Project
            </Button>
          )}
        </Flex>

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
      </Container>
    </Box>
  );
};

export default Projects;
