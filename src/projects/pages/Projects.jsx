import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";


export default function Projects({ setSelectedProject }) {
  const [loadedProjects, setLoadedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const { isOpen: isNewProjectOpen, onOpen: onNewProjectOpen, onClose: onNewProjectClose } = useDisclosure();
  const toast = useToast();

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
