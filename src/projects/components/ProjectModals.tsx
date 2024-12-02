import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaJsSquare, FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useProjects } from "../../hooks/useProjects";
import {
  renameProject,
  deleteProject,
  createProject,
} from "../../services/projects/projects";

type ProjectModalsProps = {
  isNewProjectOpen: boolean;
  onNewProjectClose: () => void;
  isEditOpen: boolean;
  onEditClose: () => void;
  isDeleteOpen: boolean;
  onDeleteClose: () => void;
};

/**
 * ProjectModals Component
 *
 * Manages the modals for creating, editing, and deleting projects.
 * Handles form input, state updates, and API requests for each modal action.
 *
 * @param isNewProjectOpen - Determines if the "New Project" modal is open.
 * @param onNewProjectClose - Function to close the "New Project" modal.
 * @param isEditOpen - Determines if the "Edit Project" modal is open.
 * @param onEditClose - Function to close the "Edit Project" modal.
 * @param isDeleteOpen - Determines if the "Delete Project" modal is open.
 * @param onDeleteClose - Function to close the "Delete Project" modal.
 */
const ProjectModals = ({
  isNewProjectOpen,
  onNewProjectClose,
  isEditOpen,
  onEditClose,
  isDeleteOpen,
  onDeleteClose,
}: ProjectModalsProps) => {
  const navigate = useNavigate();
  const { setProjects, selectProject, selectedProject } = useProjects();
  const [newProjectName, setNewProjectName] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [editedProjectName, setEditedProjectName] = useState("");
  const toast = useToast();

  const handleNewProjectSubmit = async () => {
    if (newProjectName.length < 8) {
      toast({
        title: "Invalid ProjectName",
        description: "Project name must be at least 8 characters.",
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }

    if (!selectedPlatform) {
      toast({
        title: "You Must Select a Platform",
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }

    try {
      const project = await createProject(newProjectName, selectedPlatform);
      setProjects((prev) => [...prev, project]);
      onNewProjectClose();
      toast({
        title: "Successfully Created Project",
        description: `New Project ${newProjectName} created.`,
        status: "success",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
      navigate(`/projects/${project.uuid}/setup`, {
        state: { platform: selectedPlatform, apiKey: project.api_key },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";

      toast({
        title: "Error Creating Project",
        description: errorMessage,
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
  };

  const handleEditSubmit = async () => {
    try {
      if (selectedProject) {
        await renameProject(selectedProject.uuid, editedProjectName);
        setProjects((prev) =>
          prev.map((p) =>
            p.uuid === selectedProject?.uuid
              ? { ...p, name: editedProjectName }
              : p,
          ),
        );
        onEditClose();
        selectProject(null);
        toast({
          title: "Successfully Renamed Project",
          status: "success",
          duration: 3000,
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";

      toast({
        title: "Error Renaming Project",
        description: errorMessage,
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
  };

  const handleConfirmDeletion = async () => {
    try {
      if (selectedProject) {
        await deleteProject(selectedProject.uuid);
        setProjects((prev) =>
          prev.filter((p) => p.uuid !== selectedProject?.uuid),
        );
        onDeleteClose();
        selectProject(null);
        toast({
          title: "Project Deleted",
          status: "success",
          duration: 3000,
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";

      toast({
        title: "Error Deleting Project",
        description: errorMessage,
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
  };

  const platforms = [
    { name: "JavaScript", icon: <FaJsSquare size={40} color="#F7DF1E" /> },
    { name: "React", icon: <FaReact size={40} color="#61DAFB" /> },
    { name: "Express.js", icon: <FaNodeJs size={40} color="#339933" /> },
    { name: "Flask", icon: <FaPython size={40} color="#3776AB" /> },
  ];

  return (
    <>
      {/* New Project Modal */}
      <Modal isOpen={isNewProjectOpen} onClose={onNewProjectClose} size="lg">
        <ModalOverlay />
        <ModalContent maxWidth="700px" width="90%">
          <ModalHeader>Create a New Project</ModalHeader>
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

            <Text mt={4} mb={2}>
              Choose Your Platform:
            </Text>
            <Flex justify="center" gap={4} wrap="nowrap" overflowX="auto">
              {platforms.map((platform) => (
                <Box
                  key={platform.name}
                  p={4}
                  bg={
                    selectedPlatform === platform.name
                      ? "brand.200"
                      : "gray.100"
                  }
                  borderWidth={2}
                  borderRadius="md"
                  borderColor="transparent"
                  boxShadow={selectedPlatform === platform.name ? "lg" : "none"}
                  cursor="pointer"
                  onClick={() => setSelectedPlatform(platform.name)}
                  textAlign="center"
                  width="150px"
                  height="150px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  {platform.icon}
                  <Text mt={2}>{platform.name}</Text>
                </Box>
              ))}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleNewProjectSubmit}>
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
                value={editedProjectName}
                onChange={(e) => setEditedProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleEditSubmit}>
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
    </>
  );
};

export default ProjectModals;
