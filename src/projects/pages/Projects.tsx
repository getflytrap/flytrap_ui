import { useContext } from "react";
import {
  Box,
  Heading,
  Button,
  useDisclosure,
  Container,
  Flex,
} from "@chakra-ui/react";
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
    <Box bg="gray.100" textAlign={"left"} px={6} overflowY="auto">
      <Container maxWidth="1200px" mx="auto">
        <Flex justifyContent="space-between">
          <Heading as="h2" fontSize="2rem" my="30px">
            Projects
          </Heading>
          {isRoot && (
            <Button
              onClick={onNewProjectOpen}
              size="lg"
              bg="brand.500"
              color="white"
              _hover={{
                bg: "brand.700",
              }}
              my="30px"
            >
              Start A New Project
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
