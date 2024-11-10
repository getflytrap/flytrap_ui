import { VStack } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { Project } from "../../types";

type ProjectListProps = {
  projects: Project[];
  onEditOpen: ( projectUuid: string) => void;
  onDeleteOpen: ( projectUuid: string) => void;
};

const ProjectList = ({ projects, onEditOpen, onDeleteOpen }: ProjectListProps) => (
  <VStack spacing={4} width="100%">
    {projects.map((project) => (
      <ProjectCard
        key={project.uuid}
        project={project}
        onEditOpen={onEditOpen}
        onDeleteOpen={onDeleteOpen}
      />
    ))}
  </VStack>
);

export default ProjectList;
