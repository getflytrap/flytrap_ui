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
import { User, Project } from "../../types/index";
import {
  getAllProjects,
  getUsersForProject,
  addUserToProject,
  removeUserFromProject,
} from "../../services/index";
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";

interface AssignUsersProps {
  users: User[];
}

const AssignUsers = ({ users }: AssignUsersProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);
  const [selectedProjectUuid, setSelectedProjectUuid] = useState<string>("");
  const [selectedUserUuid, setSelectedUserUuid] = useState<string>("");
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log('from assign users:')
  console.log('users:', users)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await getAllProjects();
      setProjects(data.projects);
    };
    try {
      fetchProjects();
    } catch {
      toast({
        title: "Error",
        description: "Could not fetch projects.",
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
  }, []);

  const fetchUsersForProject = async (uuid: string) => {
    try {
      const { data } = await getUsersForProject(uuid);
      setCurrentUsers(users.filter((user) => data.includes(user.uuid)));
      setSelectedProjectUuid(uuid);
    } catch {
      toast({
        title: "Error",
        description: "Could not fetch users for the selected project.",
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
  };

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
    } catch {
      toast({
        title: "Failed to remove user.",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
  };

  const addNewUserToProject = async () => {
    try {
      console.log('adding user to project...')
      console.log('user uuid: ', selectedUserUuid)
      await addUserToProject(selectedProjectUuid, selectedUserUuid);

      const newUser = users.find((user) => user.uuid === selectedUserUuid);
      console.log('new user to add:', newUser);
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
    } catch {
      toast({
        title: "Failed to add users.",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
  };

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
                console.log('selected value:', e.target.value);
                setSelectedUserUuid(e.target.value)
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
