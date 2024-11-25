import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Stack,
  HStack,
  Icon,
  Flex,
  Text,
  useToast,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
} from "@chakra-ui/react";
import {
  IoTrashOutline,
  IoArrowBackOutline,
  IoWarningOutline,
  IoCheckmarkCircleOutline,
  IoShieldCheckmarkOutline,
  IoHourglassOutline,
} from "react-icons/io5";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { deleteRejection, getRejection, toggleRejection } from "../../services";
import { useProjects } from "../../hooks/useProjects";
import { Rejection } from "../../types";

/**
 * RejectionDetails Component
 *
 * This component displays details about a specific promise rejection associated with a project.
 * It provides functionality to:
 * - View rejection metadata (browser, runtime, OS, method, path, etc.)
 * - Toggle the resolution status of a rejection (mark as resolved/unresolved)
 * - Delete the rejection from the system
 *
 * Features:
 * - Fetches rejection data by project UUID and rejection UUID
 * - Displays rejection-specific metadata
 * - Allows users to mark rejections as resolved/unresolved
 * - Supports deletion with confirmation
 */
const RejectionDetails = () => {
  const {
    projects,
    setProjects,
    selectProject,
    selectedProject,
    fetchProjectsForUser,
  } = useProjects();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [rejectionData, setRejectionData] = useState<Rejection | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resolved, setResolved] = useState<boolean>(false);
  const { handled, time } = location.state || {};
  const { project_uuid: projectUuid, rejection_uuid: rejectionUuid } =
    useParams();

   /**
   * Load project data and select the project if not already selected.
   */
  useEffect(() => {
    const loadProject = async () => {
      if (projects.length === 0) {
        await fetchProjectsForUser();
      }
      if (!selectedProject && projectUuid && projects.length > 0) {
        selectProject(projectUuid);
      }
    };

    loadProject();
  }, [projects]);

  useEffect(() => {
    const fetchRejectionData = async () => {
      try {
        setIsLoading(true);
        
        if (projectUuid && rejectionUuid) {
          const rejectionData = await getRejection(projectUuid, rejectionUuid);
          setRejectionData(rejectionData);
          setResolved(rejectionData.resolved);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred.";

        toast({
          title: "Error Fetching Rejection Data",
          description: errorMessage,
          status: "error",
          duration: 3000,
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRejectionData();
  }, []);

  const handleToggleResolved = async () => {
    let resolvedPayload = resolved ? false : true;

    try {
      if (projectUuid && rejectionUuid) {
        await toggleRejection(projectUuid, rejectionUuid, resolvedPayload);
        setResolved(resolvedPayload);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";

      toast({
        title: "Error Updating Resolved Status",
        description: errorMessage,
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
  };

  const removeRejection = async () => {
    try {
      if (projectUuid && rejectionUuid) {
        await deleteRejection(projectUuid, rejectionUuid);
  
        setProjects((prevProjects) => {
          const newProjects = prevProjects.slice();
          newProjects.map((project) => {
            if (project.uuid === projectUuid) {
              project.issue_count -= 1;
            } else {
              return project;
            }
          });
          return newProjects;
        });
        toast({
          title: "Successful Deletion",
          status: "success",
          duration: 3000,
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
        });
  
        navigate(`/projects/${projectUuid}/issues`);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";

      toast({
        title: "Deletion Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
  };

  const handleDeleteClick = () => {
    const confirmAction = window.confirm(
      "Marking this rejection as resolved will permanently remove it from the database. Would you like to continue?",
    );

    if (confirmAction) {
      removeRejection();
    }
  };

  const handleReturnToIssues = () => {
    navigate(`/projects/${projectUuid}/issues`, {
      state: {
        handled: handled,
        time: time,
      },
    });
  };

  if (!rejectionData) {
    return (
      <Center>
        <Text fontSize="2rem" p={8}>
          No Promise Rejection Data Avaialable
        </Text>
      </Center>
    );
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        {/* Return to Issues Button */}
        <Button
          size="md"
          leftIcon={<IoArrowBackOutline />}
          onClick={handleReturnToIssues}
          fontWeight="light"
          bg="gray.200"
          _hover={{ bg: "gray.100" }}
        >
          Return
        </Button>

        <Flex direction="row" gap={2}>
          {/* Mark as Resolved Button */}
          <Button
            size="md"
            onClick={handleToggleResolved}
            leftIcon={
              resolved ? <IoHourglassOutline /> : <IoCheckmarkCircleOutline />
            }
            fontWeight="light"
            bg={resolved ? "red.400" : "brand.400"}
            _hover={{
              bg: resolved ? "red.300" : "green.200",
            }}
          >
            {resolved ? <>Mark As Unresolved</> : <>Mark As Resolved</>}
          </Button>

          {/* Delete Rejection Button */}
          <Button
            size="md"
            onClick={handleDeleteClick}
            leftIcon={<IoTrashOutline />}
            fontWeight="light"
            bg="red.400"
            _hover={{ bg: "red.300" }}
          >
            Delete Rejection
          </Button>
        </Flex>
      </Flex>

      <Box
        // borderWidth={1}
        borderRadius="md"
        overflow="hidden"
        mt={8}
      >
        <Stack>
          <Flex justify="space-between" align="center" mb={4} px={4}>
            <HStack>
              <Heading as="h2" fontSize="2rem">
                Rejected Promise
              </Heading>
              <Text fontSize="1.5rem" color="gray">
                {rejectionData.method ? rejectionData.method.toUpperCase() : ""}
              </Text>
              <Text fontSize="1.5rem" color="gray">
                {rejectionData.path ? rejectionData.path : ""}
              </Text>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              {new Date(rejectionData.created_at).toLocaleString()}
            </Text>
          </Flex>
          <Flex justify="space-between" align="center" mb={4} px={4}>
            <HStack>
              <Text>{rejectionData.value}</Text>
              <Icon
                as={
                  rejectionData.handled === false
                    ? IoWarningOutline
                    : IoShieldCheckmarkOutline
                }
                color={
                  rejectionData.handled === false ? "red.500" : "green.500"
                }
              />
              <Text
                fontSize="md"
                fontWeight="bold"
                color={
                  rejectionData.handled === false ? "red.500" : "green.500"
                }
              >
                {rejectionData.handled === false ? "Unhandled" : "Handled"}
              </Text>
            </HStack>
          </Flex>
        </Stack>
        <Table my={8}>
          <Tbody>
            <Tr>
              {rejectionData.browser && rejectionData.browser !== "unknown" && (
                <Th fontSize="sm" fontWeight="bold">
                  Browser
                </Th>
              )}
              {rejectionData.runtime && rejectionData.runtime !== "unknown" && (
                <Th fontSize="sm" fontWeight="bold">
                  Runtime
                </Th>
              )}
              <Th fontSize="sm" fontWeight="bold">
                OS
              </Th>
            </Tr>
            <Tr>
              {rejectionData.browser && rejectionData.browser !== "unknown" && (
                <Td fontSize="xs" fontWeight="light" fontFamily="monospace">
                  {rejectionData.browser}
                </Td>
              )}
              {rejectionData.runtime && rejectionData.runtime !== "unknown" && (
                <Td fontSize="xs" fontWeight="light" fontFamily="monospace">
                  {rejectionData.runtime}
                </Td>
              )}
              <Td fontSize="xs" fontWeight="light" fontFamily="monospace">
                {rejectionData.os && rejectionData.os !== "unknown"
                  ? rejectionData.os
                  : "unknown"}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default RejectionDetails;
