import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Text, Button, HStack } from "@chakra-ui/react";

import { getAllProjects } from "../../services/data";

const PROJECT_LIMIT_PER_PAGE = 10;

export default function Sidebar({ selectedProject, setSelectedProject }) {
  const navigate = useNavigate();

  const [loadedProjects, setLoadedProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects(pageToRequest = 1) {
    try {
      const data = await getAllProjects(pageToRequest, PROJECT_LIMIT_PER_PAGE);
      console.log(data.projects);

      setLoadedProjects(data.projects);
      setCurrentPage(data.current_page);
      setTotalPages(data.total_pages);
    } catch (e) {
      alert("Couldn't fetch project data");
    }
  }

  const handleClick = (project) => {
    setSelectedProject(project);
    navigate("/errors");
  };

  return (
    <>
      <Stack spacing={3} color="whiteAlpha.900">
        {loadedProjects.map((project) => (
          <Box
            onClick={() => handleClick(project)}
            key={project.project_id}
            borderRadius="20px"
            bg={
              selectedProject.project_id === project.project_id
                ? "blue.100"
                : "transparent"
            }
            border={
              selectedProject.project_id === project.project_id ? "2px" : "1px"
            }
            borderColor={
              selectedProject.project_id === project.project_id
                ? "blue.500"
                : "transparent"
            }
            p={2}
            _hover={{
              borderColor: "gray.300",
            }}
            cursor="pointer"
            color={
              selectedProject.project_id === project.project_id
                ? "black"
                : "inherit"
            }
            fontWeight={
              selectedProject.project_id === project.project_id
                ? "bold"
                : "normal"
            }
          >
            <Text textAlign="left">{`${project.project_name} (${project.issue_count})`}</Text>
          </Box>
        ))}
      </Stack>
    </>
  );
}
