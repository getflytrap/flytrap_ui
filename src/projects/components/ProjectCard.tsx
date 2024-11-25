import { useState, useEffect } from "react";
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
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { FaReact, FaNodeJs, FaPython, FaJsSquare } from "react-icons/fa";
import Histogram from "./Histogram";
import { useProjects } from "../../hooks/useProjects";
import { useAuth } from "../../hooks/useAuth";
import { getDailyCounts } from "../../services";
import { Project } from "../../types";

type ProjectCardProps = {
  project: Project;
  onEditOpen: (projectUuid: string) => void;
  onDeleteOpen: (projectUuid: string) => void;
};

/**
 * Displays project information in a card format with actions and a histogram.
 */
const ProjectCard = ({
  project,
  onEditOpen,
  onDeleteOpen,
}: ProjectCardProps) => {
  const [dailyCounts, setDailyCounts] = useState<number[]>([]);
  const navigate = useNavigate();
  const { selectProject } = useProjects();
  const toast = useToast();

  // Check if the current user has root permissions
  const { isRoot } = useAuth();

  useEffect(() => {
    const getSummary = async () => {
      try {
        const counts = await getDailyCounts(project.uuid);
        setDailyCounts(counts);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred.";

        toast({
          title: "Daily Summary Error",
          description: errorMessage,
          status: "error",
          duration: 3000,
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
        });
      }
    };

    getSummary();
  }, []);

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
        return <FaReact size={50} color="#61DAFB" />;
      case "Express.js":
        return <FaNodeJs size={50} color="#339933" />;
      case "Flask":
        return <FaPython size={50} color="#3776AB" />;
      case "JavaScript":
        return <FaJsSquare size={50} color="#F7DF1E" />;
      default:
        return null;
    }
  };

  const showLogo = useBreakpointValue({ base: false, lg: true });

  return (
    <Card
      key={project.uuid}
      borderTop="8px"
      borderColor="brand.600"
      bg="white"
      cursor="pointer"
      onClick={handleProjectClick}
    >
      <CardHeader>
        <Flex justify="center" align="center" width="100%" position="relative">
          {showLogo && (
            <Box position="absolute" left="0">
              {getPlatformLogo(project.platform)}
            </Box>
          )}

          <Box width="100%" textAlign="center">
            <Heading as="h2" fontSize="1.5rem" color="gray.900">
              {project.name}
            </Heading>
          </Box>
        </Flex>
      </CardHeader>

      <CardBody color="gray.800">
        <Text fontSize="sm" textAlign="center">
          Total Issues: {project.issue_count}
        </Text>
        <Histogram dailyCounts={dailyCounts} />
      </CardBody>

      <Divider borderColor="gray.200" />

      <CardFooter>
        <HStack justify="center" spacing={8} width="100%">
          {isRoot && (
            <>
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
            </>
          )}
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
