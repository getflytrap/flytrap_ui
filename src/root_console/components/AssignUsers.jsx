import { useEffect, useState } from "react";
import { Box, Select, VStack, Text, Heading } from "@chakra-ui/react";
import { getAllProjects } from "../../services/data";

const AssignUsers = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getAllProjects();
      setProjects(data.projects);
    };
    fetchProjects();
  }, []);

  function handleProjectSelection(name) {
    setSelectedProject(name);
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

      {/* Placeholders for future sections */}
      <Text mt={6}>Current Users</Text>
      <Text>Add User</Text>
    </Box>
  );
};

export default AssignUsers;
