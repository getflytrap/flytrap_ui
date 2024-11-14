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
    fetchProjectsForUser,
  } = useProjects();

  const handleClick = (project: Project) => {
    selectProject(project.uuid);
    navigate(`/projects/${project.uuid}/issues`);
  };

  return (
    <>
      <Stack spacing={3} color="gray.900">
        {projects.map((project) => (
          <Box
            onClick={() => handleClick(project)}
            key={project.uuid}
            borderRadius="20px"
            bg={
              selectedProject?.uuid === project.uuid
                ? "green.100"
                : "transparent"
            }
            border={selectedProject?.uuid === project.uuid ? "2px" : "1px"}
            borderColor={
              selectedProject?.uuid === project.uuid
                ? "green.400"
                : "transparent"
            }
            p={2}
            _hover={{
              borderColor: "green.400",
            }}
            cursor="pointer"
            color={selectedProject?.uuid === project.uuid ? "black" : "inherit"}
            fontWeight="bold"
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
