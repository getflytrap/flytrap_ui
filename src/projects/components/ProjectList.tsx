import { Text, Grid } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { Project } from "../../types";

type ProjectListProps = {
  projects: Project[];
  onEditOpen: (projectUuid: string) => void;
  onDeleteOpen: (projectUuid: string) => void;
};

/**
 * Renders a list of projects or a message if no projects are available.
 * 
 * @param projects - Array of project data
 * @param onEditOpen - Function to handle opening the edit modal
 * @param onDeleteOpen - Function to handle opening the delete modal
 */
const ProjectList = ({
  projects,
  onEditOpen,
  onDeleteOpen,
}: ProjectListProps) => (
  <Grid
    templateColumns={["1fr", "repeat(2, 1fr)"]}
    gap={4}
    width="100%"
  >
    {projects?.length ? (
      projects.map((project) => (
        <ProjectCard
          key={project.uuid}
          project={project}
          onEditOpen={onEditOpen}
          onDeleteOpen={onDeleteOpen}
        />
      ))
    ) : (
      <Text
        fontSize="lg"
        my="30px"
        p="20px"
      >
        No Current Projects
      </Text>
    )}
  </Grid>
);

export default ProjectList;
