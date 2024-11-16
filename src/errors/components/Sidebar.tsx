import { useNavigate } from "react-router-dom";
import { Box, Stack, Text, Flex } from "@chakra-ui/react";
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
    <Flex direction="column" height="100%" overflow="hidden">
      <Stack spacing={3} color="gray.900" flex="2" py={4}>
        {projects.map((project) => (
          <Box
            key={project.uuid}
            borderLeft={
              selectedProject?.uuid === project.uuid
                ? "4px solid #186A4A"
                : "transparent"
            }
            px={4}
          >
            <Box
              onClick={() => handleClick(project)}
              bg={
                selectedProject?.uuid === project.uuid
                  ? "brand.100"
                  : "transparent"
              }
              borderRadius="8px"
              p={2}
              _hover={{
                bg: "gray.100",
              }}
              cursor="pointer"
              color={
                selectedProject?.uuid === project.uuid ? "black" : "inherit"
              }
              fontWeight="bold"
            >
              <Flex justifyContent="space-between" px={2}>
                <Text>{`${project.name}`}</Text>
                <Text color="gray.500">{`${project.issue_count}`}</Text>
              </Flex>
            </Box>
          </Box>
        ))}
      </Stack>
      <Box>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={() => fetchProjectsForUser(currentPage - 1)}
          onNextPage={() => fetchProjectsForUser(currentPage + 1)}
        />
      </Box>
    </Flex>
  );
}
