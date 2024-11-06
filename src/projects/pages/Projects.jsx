import { useState, useEffect } from "react";
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

const PROJECT_LIMIT_PER_PAGE = 10;

export default function Projects({ setSelectedProject }) {
  const toast = useToast();

  const [loadedProjects, setLoadedProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [newProjectName, setNewProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState();

  const { 
    isOpen: isNewProjectOpen, 
    onOpen: onNewProjectOpen, 
    onClose: onNewProjectClose
  } = useDisclosure();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects(page = 1) {
    try {
      setLoadingError(false);
      setIsLoading(true);
      const data = await getAllProjects(page, PROJECT_LIMIT_PER_PAGE);
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

  async function createNewProject() {
    try {
      const data = await createProject(newProjectName);
      const newProject = { project_id: data.project_id, project_name: data.project_name, issue_count: 0 };

      setLoadedProjects((prevProjects) => [...prevProjects, newProject]);
      toast({ title: "Project Created", description: "Successfully created a new project.", status: "success" });
    } catch {
      toast({ title: "Creation Error", description: "Could not create project.", status: "error" });
    }
  }

  const handleSubmit = () => {
    if (newProjectName.length < 8) {
      toast({ title: "Validation Error", description: "Project name must be at least 8 characters long.", status: "error" });
      return;
    }
    createNewProject();
    onNewProjectClose();
  };

  return (
    <Box>
      <Button onClick={handleNewProjectClick}>Start A New Project</Button>
      <Heading mb="40px">Active Projects:</Heading>
      <VStack spacing={4} width="100%">
        {loadedProjects.map((project) => (
          <Card
            key={project.project_id}
            borderTop="8px"
            borderColor="purple.400"
            bg="gray.100"
            onClick={() => handleProjectClick(project)}
            cursor="pointer"
            width="50%"
          >
            <CardHeader color="gray.900">
              <Heading as="h2" size="lg">
                {project.project_name}
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
          <ModalBody>
            <FormControl>
              <FormLabel>Project Name</FormLabel>
              <Input value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} placeholder="Enter project name" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={onNewProjectClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
