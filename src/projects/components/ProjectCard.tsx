import { useNavigate } from "react-router-dom";
import {
  Heading,
  Text,
  Button,
  HStack,
  Divider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, InfoOutlineIcon } from "@chakra-ui/icons"; // Import InfoOutlineIcon for Setup button
import { Project } from "../../types";
import { useProjects } from "../../hooks/useProjects";

type ProjectCardProps = {
  project: Project;
  onEditOpen: (projectUuid: string) => void;
  onDeleteOpen: (projectUuid: string) => void;
};

const ProjectCard = ({
  project,
  onEditOpen,
  onDeleteOpen,
}: ProjectCardProps) => {
  const navigate = useNavigate();
  const { selectProject } = useProjects();

  const handleProjectClick = () => {
    selectProject(project.uuid);
    navigate(`/projects/${project.uuid}/errors`);
  };

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onEditOpen(project.uuid);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDeleteOpen(project.uuid);
  };

  const handleSetupClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/projects/${project.uuid}/setup`);
  };

  return (
    <Card
      key={project.uuid}
      borderTop="8px"
      borderColor="green.400"
      bg="gray.100"
      cursor="pointer"
      width="50%"
      onClick={handleProjectClick}
    >
      <CardHeader color="gray.900">
        <Heading as="h2" size="lg">
          {project.name}
        </Heading>
      </CardHeader>

      <CardBody color="gray.800">
        <Text fontSize="lg">{project.issue_count} Issues</Text>
      </CardBody>

      <Divider borderColor="gray.200" />

      <CardFooter>
        <HStack justify="center" spacing={8} width="100%">
          <Button
            variant="ghost"
            leftIcon={<EditIcon />}
            onClick={handleEditClick}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            leftIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
          <Button
            variant="ghost"
            leftIcon={<InfoOutlineIcon />} // Use InfoOutlineIcon for setup instructions
            onClick={handleSetupClick}
          >
            Setup
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
