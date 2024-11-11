import { useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
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
  Box,
  Flex,
} from "@chakra-ui/react";
import { FaJsSquare, FaReact, FaNodeJs, FaPython } from "react-icons/fa"; // import icons

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
  const navigate = useNavigate()

  const { setProjects, selectProject, selectedProject } = useProjects();
  const [newProjectName, setNewProjectName] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
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

    if (!selectedPlatform) {
      toast({
        title: "Must select a platform",
        status: "error",
      });
      return;
    }

    try {
      const { uuid, name } = await createProject(newProjectName);
      setProjects((prev) => [...prev, { uuid, name, issue_count: 0 }]);
      onNewProjectClose();
      toast({ title: "Project created", status: "success" });
      navigate(`/projects/${uuid}/setup`, { state: { platform: selectedPlatform } })
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

  const platforms = [
    { name: "Javascript", icon: <FaJsSquare size={40} /> },
    { name: "React", icon: <FaReact size={40} /> },
    { name: "Express.js", icon: <FaNodeJs size={40} /> },
    { name: "Flask", icon: <FaPython size={40} /> },
  ];

  return (
    <>
      {/* New Project Modal */}
      <Modal isOpen={isNewProjectOpen} onClose={onNewProjectClose} size="lg">
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

            {/* Choose your platform */}
            <Text mt={4} mb={2}>Choose Your Platform:</Text>
            <Flex justify="center" gap={4} wrap="nowrap" overflowX="auto">
              {platforms.map((platform) => (
                <Box
                  key={platform.name}
                  p={4}
                  bg={selectedPlatform === platform.name ? "green.400" : "gray.200"} // Background change
                  borderWidth={2}
                  borderRadius="md"
                  borderColor={selectedPlatform === platform.name ? "blue.500" : "gray.300"}
                  boxShadow={selectedPlatform === platform.name ? "lg" : "none"}
                  cursor="pointer"
                  onClick={() => setSelectedPlatform(platform.name)}
                  textAlign="center"
                  width="150px" // fixed width for all cards
                  height="150px" // fixed height for all cards
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




// import { useState } from "react";
// import {
//   renameProject,
//   deleteProject,
//   createProject,
// } from "../../services/projects/projects";
// import { useProjects } from "../../hooks/useProjects";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Text,
//   useToast,
// } from "@chakra-ui/react";

// type ProjectModalsProps = {
//   isNewProjectOpen: boolean;
//   onNewProjectClose: () => void;
//   isEditOpen: boolean;
//   onEditClose: () => void;
//   isDeleteOpen: boolean;
//   onDeleteClose: () => void;
// };

// const ProjectModals = ({
//   isNewProjectOpen,
//   onNewProjectClose,
//   isEditOpen,
//   onEditClose,
//   isDeleteOpen,
//   onDeleteClose,
// }: ProjectModalsProps) => {
//   const { setProjects, selectProject, selectedProject } = useProjects();

//   const [newProjectName, setNewProjectName] = useState("");
//   const [editedProjectName, setEditedProjectName] = useState("");

//   const toast = useToast();

//   const handleNewProjectSubmit = async () => {
//     if (newProjectName.length < 8) {
//       toast({
//         title: "Project name must be at least 8 characters",
//         status: "error",
//       });
//       return;
//     }
//     try {
//       const { uuid, name } = await createProject(newProjectName);
//       setProjects((prev) => [...prev, { uuid, name, issue_count: 0 }]);
//       onNewProjectClose();
//       toast({ title: "Project created", status: "success" });
//     } catch {
//       toast({ title: "Error creating project", status: "error" });
//     }
//   };

//   const handleEditSubmit = async () => {
//     try {
//       await renameProject(selectedProject?.uuid, editedProjectName);
//       setProjects((prev) =>
//         prev.map((p) =>
//           p.uuid === selectedProject?.uuid
//             ? { ...p, name: editedProjectName }
//             : p,
//         ),
//       );
//       onEditClose();
//       selectProject(null);
//       toast({ title: "Project renamed", status: "success" });
//     } catch {
//       toast({ title: "Error renaming project", status: "error" });
//     }
//   };

//   const handleConfirmDeletion = async () => {
//     try {
//       await deleteProject(selectedProject?.uuid);
//       setProjects((prev) =>
//         prev.filter((p) => p.uuid !== selectedProject?.uuid),
//       );
//       onDeleteClose();
//       selectProject(null);
//       toast({ title: "Project deleted", status: "success" });
//     } catch {
//       toast({ title: "Error deleting project", status: "error" });
//     }
//   };

//   return (
//     <>
//       {/* New Project Modal */}
//       <Modal isOpen={isNewProjectOpen} onClose={onNewProjectClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Create New Project</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <FormControl>
//               <FormLabel>Project Name</FormLabel>
//               <Input
//                 value={newProjectName}
//                 onChange={(e) => setNewProjectName(e.target.value)}
//                 placeholder="Enter project name"
//               />
//             </FormControl>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={handleNewProjectSubmit}>
//               Submit
//             </Button>
//             <Button variant="ghost" onClick={onNewProjectClose}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       {/* Edit Project Modal */}
//       <Modal isOpen={isEditOpen} onClose={onEditClose}>
//         <ModalOverlay />
//         <ModalContent p={4}>
//           <ModalHeader>Edit Project Name</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <FormControl>
//               <FormLabel>Name</FormLabel>
//               <Input
//                 value={editedProjectName}
//                 onChange={(e) => setEditedProjectName(e.target.value)}
//                 placeholder="Enter project name"
//               />
//             </FormControl>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>
//               Submit
//             </Button>
//             <Button variant="ghost" onClick={onEditClose}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       {/* Delete Project Modal */}
//       <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
//         <ModalOverlay />
//         <ModalContent p={4}>
//           <ModalHeader>Confirm Deletion</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Text>
//               Are you sure you want to delete this project? This action cannot
//               be undone.
//             </Text>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="red" mr={3} onClick={handleConfirmDeletion}>
//               Confirm Delete Project
//             </Button>
//             <Button variant="ghost" onClick={onDeleteClose}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default ProjectModals;
