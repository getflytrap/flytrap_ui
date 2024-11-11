import { useNavigate } from "react-router-dom";
import { Box, Stack, Text } from "@chakra-ui/react";
import { useProjects } from "../../hooks/useProjects";
import PaginationControls from "../../shared/Pagination";
import { Project } from "../../types";

export default function Sidebar() {
  const navigate = useNavigate();
  const { 
    projects, 
    selectProject, 
    selectedProject, 
    currentPage, 
    totalPages, 
    fetchProjectsForUser 
  } = useProjects();

  const handleClick = (project: Project) => {
    selectProject(project.uuid);
    navigate(`/projects/${project.uuid}/errors`);
  };

  return (
    <>
      <Stack spacing={3} color="whiteAlpha.900">
        {projects.map((project) => (
          <Box
            onClick={() => handleClick(project)}
            key={project.uuid}
            borderRadius="20px"
            bg={
              selectedProject?.uuid === project.uuid ? "blue.100" : "transparent"
            }
            border={selectedProject?.uuid === project.uuid ? "2px" : "1px"}
            borderColor={
              selectedProject?.uuid === project.uuid ? "blue.500" : "transparent"
            }
            p={2}
            _hover={{
              borderColor: "gray.300",
            }}
            cursor="pointer"
            color={selectedProject?.uuid === project.uuid ? "black" : "inherit"}
            fontWeight={
              selectedProject?.uuid === project.uuid ? "bold" : "normal"
            }
          >
            <Text textAlign="left">{`${project.name} (${project.issue_count})`}</Text>
          </Box>
        ))}
      </Stack>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={() => fetchProjectsForUser(currentPage - 1)}
        onNextPage={() => fetchProjectsForUser(currentPage + 1)}
      />
    </>
  );
}
