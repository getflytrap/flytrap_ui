import { useState } from "react";
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
  useToast
} from "@chakra-ui/react";
import { renameProject, deleteProject, createProject } from "../../services";
import { useProjects } from "../../hooks/useProjects";


type ProjectModalsProps = {
  isNewProjectOpen: boolean;
  onNewProjectClose: () => void;
  isEditOpen: boolean;
  onEditClose: () => void;
  isDeleteOpen: boolean;
  onDeleteClose: () => void;
  selectedProjectUuid: string | null;
};

const ProjectModals = ({
  isNewProjectOpen,
  onNewProjectClose,
  isEditOpen,
  onEditClose,
  isDeleteOpen,
  onDeleteClose,
  selectedProjectUuid
}: ProjectModalsProps) => {
  const { setProjects } = useProjects(); 

  const [newProjectName, setNewProjectName] = useState("");
  const [editedProjectName, setEditedProjectName] = useState("");

  const toast = useToast();

  const handleNewProjectSubmit = async () => {
    if (newProjectName.length < 8) {
      toast({ title: "Project name must be at least 8 characters", status: "error" });
      return;
    }
    try {
      const { data } = await createProject(newProjectName);
      setProjects((prev) => [...prev, { uuid: data.uuid, name: data.name, issue_count: 0 }]);
      onNewProjectClose();
      toast({ title: "Project created", status: "success" });
    } catch {
      toast({ title: "Error creating project", status: "error" });
    }
  };

  const handleEditSubmit = async () => {
    try {
      await renameProject(selectedProjectUuid, editedProjectName);
      setProjects((prev) => prev.map((p) => (p.uuid === selectedProjectUuid ? { ...p, name: editedProjectName } : p)));
      onEditClose();
      toast({ title: "Project renamed", status: "success" });
    } catch {
      toast({ title: "Error renaming project", status: "error" });
    }
  };

  const handleConfirmDeletion = async () => {
    try {
      await deleteProject(selectedProjectUuid);
      setProjects((prev) => prev.filter((p) => p.uuid !== selectedProjectUuid));
      onDeleteClose();
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
              Are you sure you want to delete this project? This action cannot be
              undone.
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
  )
};

export default ProjectModals;
