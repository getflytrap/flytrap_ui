import { useState } from "react";
import {
  renameProject,
  deleteProject,
  createProject,
} from "../../services/projects/projects";
import { useProjects } from "../../hooks/useProjects";
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
} from "@chakra-ui/react";

type ProjectModalsProps = {
  isNewProjectOpen: boolean;
  onNewProjectClose: () => void;
  isEditOpen: boolean;
  onEditClose: () => void;
  isDeleteOpen: boolean;
  onDeleteClose: () => void;
};

const ProjectModals = ({
  isNewProjectOpen,
  onNewProjectClose,
  isEditOpen,
  onEditClose,
  isDeleteOpen,
  onDeleteClose,
}: ProjectModalsProps) => {
  const { setProjects, selectProject, selectedProject } = useProjects();

  const [newProjectName, setNewProjectName] = useState("");
  const [editedProjectName, setEditedProjectName] = useState("");

  const toast = useToast();

  const handleNewProjectSubmit = async () => {
    if (newProjectName.length < 8) {
      toast({
        title: "Project name must be at least 8 characters",
        status: "error",
      });
      return;
    }
    try {
      const { uuid, name } = await createProject(newProjectName);
      setProjects((prev) => [...prev, { uuid, name, issue_count: 0 }]);
      onNewProjectClose();
      toast({ title: "Project created", status: "success" });
    } catch {
      toast({ title: "Error creating project", status: "error" });
    }
  };

  const handleEditSubmit = async () => {
    try {
      await renameProject(selectedProject?.uuid, editedProjectName);
      setProjects((prev) =>
        prev.map((p) =>
          p.uuid === selectedProject?.uuid
            ? { ...p, name: editedProjectName }
            : p,
        ),
      );
      onEditClose();
      selectProject(null);
      toast({ title: "Project renamed", status: "success" });
    } catch {
      toast({ title: "Error renaming project", status: "error" });
    }
  };

  const handleConfirmDeletion = async () => {
    try {
      await deleteProject(selectedProject?.uuid);
      setProjects((prev) =>
        prev.filter((p) => p.uuid !== selectedProject?.uuid),
      );
      onDeleteClose();
      selectProject(null);
      toast({ title: "Project deleted", status: "success" });
    } catch {
      toast({ title: "Error deleting project", status: "error" });
    }
  };

  return (
    <>
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
            <Button colorScheme="blue" mr={3} onClick={handleNewProjectSubmit}>
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
    </>
  );
};

export default ProjectModals;
