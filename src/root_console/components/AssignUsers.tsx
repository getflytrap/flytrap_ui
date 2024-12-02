import { useEffect, useState } from "react";
import {
  Box,
  Select,
  IconButton,
  Button,
  useToast,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";
import {
  getAllProjects,
  getUsersForProject,
  addUserToProject,
  removeUserFromProject,
} from "../../services/index";
import { User, Project } from "../../types/index";

interface AssignUsersProps {
  users: User[];
}

/**
 * Component to assign users to projects and manage existing assignments.
 * @param users - List of all users available for assignment.
 */
const AssignUsers = ({ users }: AssignUsersProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);
  const [selectedProjectUuid, setSelectedProjectUuid] = useState<string>("");
  const [selectedUserUuid, setSelectedUserUuid] = useState<string>("");
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  /**
   * Fetches the list of all projects on component mount.
   */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await getAllProjects();
        setProjects(projectData.projects);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred.";

        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 3000,
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
        });
      }
    };

    fetchProjects();
  }, []);

  /**
   * Fetches users for the selected project and updates the state.
   *
   * @param uuid - The UUID of the selected project.
   */
  const fetchUsersForProject = async (uuid: string) => {
    try {
      const usersForProject = await getUsersForProject(uuid);
      setCurrentUsers(
        users.filter((user) => usersForProject.includes(user.uuid)),
      );
      setSelectedProjectUuid(uuid);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";

      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
  };

  /**
   * Removes a user from the selected project.
   *
   * @param projectUuid - The UUID of the project.
   * @param userUuid - The UUID of the user to remove.
   */
  const deleteUserFromProject = async (
    projectUuid: string,
    userUuid: string,
  ) => {
    try {
      await removeUserFromProject(projectUuid, userUuid);
      setCurrentUsers((prevUsers) =>
        prevUsers.filter((user) => user.uuid !== userUuid),
      );

      toast({
        title: "Success.",
        description: "User was removed from the project.",
        status: "success",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";

      toast({
        title: "Error",
        description: errorMessage,
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
  };

  /**
   * Assigns a new user to the selected project.
   */
  const addNewUserToProject = async () => {
    try {
      await addUserToProject(selectedProjectUuid, selectedUserUuid);
      const newUser = users.find((user) => user.uuid === selectedUserUuid);
      if (newUser) {
        setCurrentUsers((prevUsers) => [...prevUsers, newUser]);
      }

      setSelectedUserUuid("");
      toast({
        title: "Success",
        description: "User was added to the project.",
        status: "success",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
      onClose();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";

      toast({
        title: "Error",
        description: errorMessage,
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
  };

  // Filter out users already assigned to the current project and root users
  const availableUsers = users.filter(
    (user) =>
      !currentUsers.some((currentUser) => currentUser.uuid === user.uuid) &&
      !user.is_root,
  );

  return (
    <Box>
      <Box textAlign="right">
        <Button
          colorScheme="teal"
          my={8}
          mr={8}
          leftIcon={<IoAddCircleOutline />}
          onClick={onOpen}
        >
          Assign User to Project
        </Button>
      </Box>
      <Divider />

      {/* Project Selection */}
      <Flex gap={12} p={6}>
        <Box flex="1">
          <Select
            placeholder="Select a project"
            size="lg"
            onChange={(e) => fetchUsersForProject(e.target.value)}
          >
            <option value="" disabled hidden>
              Select a project
            </option>
            {projects.map((project) => (
              <option key={project.uuid} value={project.uuid}>
                {project.name}
              </option>
            ))}
          </Select>
        </Box>

        {/* User Management */}
        <Box flex="3" overflowY="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th isNumeric>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentUsers.map((user) => (
                <Tr key={user.uuid}>
                  <Td>{`${user.first_name} ${user.last_name}`}</Td>
                  <Td>{user.email}</Td>
                  <Td isNumeric>
                    <IconButton
                      icon={<IoTrashOutline />}
                      aria-label="Remove User"
                      size="sm"
                      colorScheme="red"
                      onClick={() =>
                        deleteUserFromProject(selectedProjectUuid, user.uuid)
                      }
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>

      {/* Add User Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assign User to Project</ModalHeader>
          <ModalBody>
            <Select
              placeholder="Select a user"
              onChange={(e) => {
                setSelectedUserUuid(e.target.value);
              }}
              value={selectedUserUuid}
            >
              {availableUsers.map((user) => (
                <option key={user.uuid} value={user.uuid}>
                  {`${user.first_name} ${user.last_name}`}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={addNewUserToProject}>
              Add
            </Button>
            <Button onClick={onClose} ml={2}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AssignUsers;
