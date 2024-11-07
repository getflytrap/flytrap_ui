import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Text, Button, HStack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const PROJECT_LIMIT_PER_PAGE = 10;

export default function Sidebar({
  selectedProject,
  setSelectedProject,
  projects,
  fetchProjects,
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const navigate = useNavigate();

  function prevPage() {
    fetchProjects(currentPage - 1);
  }

  function nextPage() {
    fetchProjects(currentPage + 1);
  }

  const handleClick = (project) => {
    setSelectedProject(project);
    navigate("/errors");
  };

  return (
    <>
      <Stack spacing={3} color="whiteAlpha.900">
        {console.log("loaded projects: ", projects)}
        {projects.map((project) => (
          <Box
            onClick={() => handleClick(project)}
            key={project.uuid}
            borderRadius="20px"
            bg={
              selectedProject.uuid === project.uuid ? "blue.100" : "transparent"
            }
            border={selectedProject.uuid === project.uuid ? "2px" : "1px"}
            borderColor={
              selectedProject.uuid === project.uuid ? "blue.500" : "transparent"
            }
            p={2}
            _hover={{
              borderColor: "gray.300",
            }}
            cursor="pointer"
            color={selectedProject.uuid === project.uuid ? "black" : "inherit"}
            fontWeight={
              selectedProject.uuid === project.uuid ? "bold" : "normal"
            }
          >
            <Text textAlign="left">{`${project.name} (${project.issue_count})`}</Text>
          </Box>
        ))}
      </Stack>
      <HStack justify="space-between" mt={4}>
        <Button
          leftIcon={<ChevronLeftIcon />}
          onClick={prevPage}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>

        <Button
          rightIcon={<ChevronRightIcon />}
          onClick={nextPage}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </HStack>
    </>
  );
}
