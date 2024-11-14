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
  Flex,
  Box,
  useBreakpointValue, // Import useBreakpointValue
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { Project } from "../../types";
import { useProjects } from "../../hooks/useProjects";
import { FaReact, FaNodeJs, FaPython, FaJsSquare } from "react-icons/fa";

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
    navigate(`/projects/${project.uuid}/issues`);
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
    navigate(`/projects/${project.uuid}/setup`, {
      state: { platform: project.platform },
    });
  };

  const getPlatformLogo = (platform: string) => {
    switch (platform) {
      case "React":
        return <FaReact size={50} />;
      case "Express.js":
        return <FaNodeJs size={50} />;
      case "Flask":
        return <FaPython size={50} />;
      case "JavaScript":
        return <FaJsSquare size={50} />;
      default:
        return null;
    }
  };

  const showLogo = useBreakpointValue({ base: false, lg: true });

  return (
    <Card
      key={project.uuid}
      borderTop="8px"
      borderColor="green.400"
      bg="white"
      cursor="pointer"
      width={["90%", "75%", "50%"]} // Adjust card width for different screen sizes
      onClick={handleProjectClick}
    >
      <CardHeader>
        <Flex justify="center" align="center" width="100%" position="relative">
          {/* Render logo only if screen size is medium or larger */}
          {showLogo && (
            <Box position="absolute" left="0">
              {getPlatformLogo(project.platform)}
            </Box>
          )}

          <Box width="100%" textAlign="center">
            <Heading as="h2" size="lg" color="gray.900">
              {project.name}
            </Heading>
          </Box>
        </Flex>
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
            leftIcon={<InfoOutlineIcon />}
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
