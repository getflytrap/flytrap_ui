import { useEffect, useState } from "react";
import {
  Box,
  Select,
  VStack,
  Text,
  HStack,
  IconButton,
  Button,
  useToast,
  Heading,
  Flex
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { User, Project } from "../../types/index";
import {
  getAllProjects,
  getUsersForProject,
  addUserToProject,
  removeUserFromProject,
} from "../../services/index";

interface AssignUsersProps {
  users: User[];
}

const AssignUsers: React.FC<AssignUsersProps> = ({ users }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);
  const [selectedProjectUuid, setSelectedProjectUuid] = useState<string>("");
  const [selectedUserUuid, setSelectedUserUuid] = useState<string>("");
  const toast = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await getAllProjects();
      setProjects(data.projects);
    };
    try {
      fetchProjects();
    } catch {
      alert("Could not fetch projects");
    }
  }, []);

  const handleProjectSelection = (uuid: string) => {
    fetchUsersForProject(uuid);
  };

  const handleUserSelection = (uuid: string) => {
    setSelectedUserUuid(uuid);
  };

  const fetchUsersForProject = async (uuid: string) => {
    try {
      const { data } = await getUsersForProject(uuid);
      setCurrentUsers(users.filter((user) => data.includes(user.uuid)));
      setSelectedProjectUuid(uuid);
    } catch {
      alert("Could not fetch users for selected project");
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
        description: "User has been removed from the project.",
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
      })
    }
  };

  const addNewUserToProject = async () => {
    try {
      await addUserToProject(selectedProjectUuid, selectedUserUuid);

      setCurrentUsers((prevUsers) => {
        const newUser = users.find((user) => user.uuid === selectedUserUuid);
        return newUser ? [...prevUsers, newUser] : prevUsers;
      });

      setSelectedUserUuid("");
      toast({
        title: "Success.",
        description: "Users have been added to the project.",
        status: "success",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    } catch {
      toast({
        title: "Failed to add users.",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      })
    }
  };

  const availableUsers = users.filter(
    (user) =>
      !currentUsers.some((currentUser) => currentUser.uuid === user.uuid) &&
      !user.is_root,
  );

  return (
    <Box
      padding={5}
      minHeight="600px"
      px={12}
      mx={12}
    >
      <Heading as="h2" fontSize="1.5rem" mb={4} textAlign="center">
        Project Assignments
      </Heading>
      <Flex justifyContent="center" gap={8} pt={8}>
        {/* Project Selection Column */}
        <VStack align="start" spacing={4} flex="1">
          <Text fontWeight="bold" fontSize="lg">
            Project
          </Text>
          <Select
            placeholder="Select a project"
            onChange={(e) => {
              handleProjectSelection(e.target.value);
            }}
          >
            {projects.map((project) => (
              <option key={project.uuid} value={project.uuid}>
                {project.name}
              </option>
            ))}
          </Select>
        </VStack>

        {/* Current Users Column */}
        <VStack align="start" flex="1" spacing={4}>
          <Text fontWeight="bold" fontSize="lg">
            Current Users
          </Text>
          <VStack spacing={2}>
            {currentUsers.map((user) => (
              <HStack key={user.uuid} justify="space-between" width="full">
                <Text>{`${user.first_name} ${user.last_name}`}</Text>
                <IconButton
                  icon={<FaTrash />}
                  aria-label="Remove User"
                  size="sm"
                  onClick={() =>
                    deleteUserFromProject(selectedProjectUuid, user.uuid)
                  }
                />
              </HStack>
            ))}
          </VStack>
        </VStack>

        {/* Add User Column */}
        <VStack align="start" flex="1" spacing={4}>
          <Text fontWeight="bold" fontSize="lg">
            Add User
          </Text>
          <Select
            placeholder="Select users to add"
            multiple
            size="lg"
            height="300px"
            minWidth="300px"
            onChange={(e) => {
              handleUserSelection(e.target.value);
            }}
          >
            {availableUsers.map((user) => (
              <option key={user.uuid} value={user.uuid}>
                {`${user.first_name} ${user.last_name}`}
              </option>
            ))}
          </Select>
          <Button mt={2} onClick={addNewUserToProject} colorScheme="teal">
            Add
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default AssignUsers;
