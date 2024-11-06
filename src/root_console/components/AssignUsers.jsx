import { useEffect, useState } from "react";
import { 
  Box, 
  Select, 
  VStack, 
  Text, 
  HStack,
  IconButton, 
  Heading,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { 
  getAllProjects, 
  getUsersForProject, 
  removeUserFromProject 
} from "../../services/data";

const AssignUsers = ({ users }) => {
  const [projects, setProjects] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getAllProjects();
      setProjects(data.projects);
    };
    fetchProjects();
  }, []);

  async function fetchUsersForProject(selection) {
    try {
      const data = await getUsersForProject(selection.project_id);
      const usersForProject = users.filter((user) => data.includes(user.id));
      setCurrentUsers(usersForProject);
      setSelectedProject(selection);
    } catch {
      alert("Could not fetch users for selected project");
    }
  }

  function handleProjectSelection(name) {
    const selection = projects.find((project) => project.project_name === name);
    fetchUsersForProject(selection);
  }

  async function deleteUserFromProject(project_id, user_id) {
    try {
      await removeUserFromProject(project_id, user_id);
      setCurrentUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== user_id)
      );
    } catch {
      alert("Could not remove user from project");
    }
  }

  return (
    <Box
      borderWidth={1}
      borderRadius="lg"
      padding={5}
      minHeight="600px"
      boxShadow="lg"
      maxW="800px"
      mx="auto"
    >
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Project Assignments
      </Heading>
      <HStack spacing={10} align="start">
        {/* Project Selection Column */}
        <VStack align="start" spacing={4}>
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
              <option key={project.project_id} value={project.project_name}>
                {project.project_name}
              </option>
            ))}
          </Select>
        </VStack>

        {/* Current Users Column */}
        <VStack align="start" flex={1} spacing={4}>
          <Text fontWeight="bold" fontSize="lg">
            Current Users
          </Text>
          <VStack spacing={2}>
            {currentUsers.map((user) => (
              <HStack key={user.id} justify="space-between" width="full">
                <Text>{`${user.first_name} ${user.last_name}`}</Text>
                <IconButton
                  icon={<FaTrash />}
                  aria-label="Remove User"
                  size="sm"
                  onClick={() =>
                    deleteUserFromProject(selectedProject.project_id, user.id)
                  }
                />
              </HStack>
            ))}
          </VStack>
        </VStack>

        {/* Placeholder */}
        <Text>Add User</Text>
      </HStack>
    </Box>
  );
};

export default AssignUsers;
