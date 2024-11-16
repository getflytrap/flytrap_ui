import { Text, Grid } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { Project } from "../../types";

type ProjectListProps = {
  projects: Project[];
  onEditOpen: (projectUuid: string) => void;
  onDeleteOpen: (projectUuid: string) => void;
};

const ProjectList = ({
  projects,
  onEditOpen,
  onDeleteOpen,
}: ProjectListProps) => (
  <Grid
    templateColumns={["1fr", "repeat(2, 1fr)"]} // Responsive grid layout
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
        borderRadius="20px"
        border="solid 1px gray"
        p="20px"
      >
        No Current Project Assignments
      </Text>
    )}
  </Grid>
);

export default ProjectList;
