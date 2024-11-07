import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Center,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  renameProject,
  deleteProject,
  createProject,
  getAllProjects,
} from "../../services/data";
import WarningModal from "../../shared/WarningModal";

const PROJECT_LIMIT_PER_PAGE = 10;

export default function Projects({ setSelectedProject }) {
  const navigate = useNavigate();
  const toast = useToast();

  const [loadedProjects, setLoadedProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [projectName, setProjectName] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isNewProjectOpen,
    onOpen: onNewProjectOpen,
    onClose: onNewProjectClose,
  } = useDisclosure();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects(page = 1) {
    try {
      setLoadingError(false);
      setIsLoading(true);
      const { data } = await getAllProjects(page, PROJECT_LIMIT_PER_PAGE);
      console.log("projects data:", data);
      setLoadedProjects(data.projects);
      setCurrentPage(data.current_page);
      setTotalPages(data.total_pages);

      setIsLoading(false);
    } catch (e) {
      setLoadingError(e.message);
      setIsLoading(false);
    }
  }

  function prevPage() {
    fetchProjects(currentPage - 1);
  }

  function nextPage() {
    fetchProjects(currentPage + 1);
  }

  const handleNewProjectClick = () => {
    onNewProjectOpen();
  };

  const handleProjectClick = (project) => {
    navigate("/errors", { state: { selection: project } });
  };

  const handleEditClick = (project, event) => {
    event.stopPropagation();
    setSelectedProjectId(project.uuid);
    setProjectName(project.name);
    onEditOpen();
  };

  const handleDeleteClick = (project, event) => {
    event.stopPropagation();
    setSelectedProjectId(project.uuid);
    onDeleteOpen();
  };

  const handleEditSubmit = async () => {
    try {
      const { data } = await renameProject(selectedProjectId, projectName);
      setLoadedProjects((prevProjects) => {
        const otherProjects = [];
        let projectToEdit;

        prevProjects.forEach((project) => {
          if (project.uuid === data.uuid) {
            projectToEdit = project;
          } else {
            otherProjects.push(project);
          }
        });

        projectToEdit.name = data.name;
        return [projectToEdit, ...otherProjects];
      });
      toast({
        title: "Successful Renaming of Project",
        description: "Project successfully renamed",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onEditClose();
    } catch {
      toast({
        title: "Error Renaming Project",
        description: "Project could not be renamed",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleConfirmDeletion = async () => {
    try {
      const data = await deleteProject(selectedProjectId);

      setLoadedProjects((prevProjects) =>
        prevProjects.filter((project) => project.uuid !== selectedProjectId)
      );
      toast({
        title: "Successful Deleting of Project",
        description: "Project successfully deleted",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onDeleteClose();
    } catch {
      toast({
        title: "Error Deleting Project",
        description: "Project could not be deleted",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = () => {
    if (newProjectName.length < 8) {
      toast({
        title: "Validation Error",
        description: "Project name must be at least 8 characters long.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    createNewProject();
    onNewProjectClose();
  };

  async function createNewProject() {
    try {
      const { data } = await createProject(newProjectName);
      console.log(data);
      const newProject = { uuid: data.uuid, name: data.name, issue_count: 0 };
      console.log("new project: ", newProject);

      setLoadedProjects((prevProjects) => [...prevProjects, newProject]);
      toast({
        title: "Project Created",
        description: "Successfully created a new project.",
        status: "success",
      });
    } catch {
      toast({
        title: "Creation Error",
        description: "Could not create project.",
        status: "error",
      });
    }
  }

  if (!loadedProjects || loadedProjects.length === 0) {
    return (
      <>
        <Button
          colorScheme="purple"
          size="lg"
          onClick={handleNewProjectClick}
          mb="40px"
          mx="auto"
          display="block"
        >
          Start A New Project
        </Button>
        <Heading mb="40px">No current projects.</Heading>

        {/* New Project Modal */}
        <Modal isOpen={isNewProjectOpen} onClose={onNewProjectClose}>
          <ModalOverlay />
          <ModalContent p={4}>
            <ModalHeader>Create New Project</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Project Name</FormLabel>
                <Input
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Enter project name"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant="ghost" onClick={onNewProjectClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  if (loadingError) {
    return (
      <WarningModal
        isOpen={true}
        onClose={() => setLoadingError(false)}
        errorMessage={loadingError.message}
      />
    ); // this still requires wiring
  }

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <Box>
      <Button onClick={handleNewProjectClick}>Start A New Project</Button>
      <Heading mb="40px">Active Projects:</Heading>
      <VStack spacing={4} width="100%">
        {loadedProjects.map((project) => (
          <Card
            key={project.uuid}
            borderTop="8px"
            borderColor="purple.400"
            bg="gray.100"
            onClick={() => handleProjectClick(project)}
            cursor="pointer"
            width="50%"
          >
            <CardHeader color="gray.900">
              <Heading as="h2" size="lg">
                {project.name}
              </Heading>
            </CardHeader>

            <CardBody color="gray.800">
              <Text fontSize="lg">{project.issue_count} Issues</Text>
            </CardBody>

            <Divider borderColor="gray.200" />

            <CardFooter>
              <HStack justify="center" spacing={8} width="100%">
                <Button
                  variant="ghost"
                  leftIcon={<EditIcon />}
                  onClick={(event) => handleEditClick(project, event)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  leftIcon={<DeleteIcon />}
                  onClick={(event) => handleDeleteClick(project, event)}
                >
                  Delete
                </Button>
              </HStack>
            </CardFooter>
          </Card>
        ))}
      </VStack>
      <HStack justify="space-between" mt={4}>
        <Button
          leftIcon={<ChevronLeftIcon />}
          onClick={prevPage}
          isDisabled={currentPage === 1}
        >
          Previous Page
        </Button>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          rightIcon={<ChevronRightIcon />}
          onClick={nextPage}
          isDisabled={currentPage === totalPages}
        >
          Next Page
        </Button>
      </HStack>

      {/* New Project Modal */}
      <Modal isOpen={isNewProjectOpen} onClose={onNewProjectClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Project Name</FormLabel>
              <Input
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onNewProjectClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Project Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent p={4}>
          <ModalHeader>Edit Project Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onEditClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Project Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent p={4}>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete this project? This action cannot
              be undone.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleConfirmDeletion}>
              Confirm Delete Project
            </Button>
            <Button variant="ghost" onClick={onDeleteClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
