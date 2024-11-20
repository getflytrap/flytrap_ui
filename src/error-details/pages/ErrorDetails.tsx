import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Heading,
  Collapse,
  Stack,
  HStack,
  Icon,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Flex,
  Center,
  useToast,
} from "@chakra-ui/react";
import WarningModal from "../../shared/WarningModal";
import { deleteError, getError, toggleError } from "../../services";
import { useProjects } from "../../hooks/useProjects";
import { ErrorData, FrameWithContext } from "../../types";
import { parseStackTrace } from "../../helpers";
import LoadingSpinner from "../../shared/LoadingSpinner";
import CodeContextDisplay from "../components/ContextDisplay";
import {
  IoTrashOutline,
  IoArrowBackOutline,
  IoWarningOutline,
  IoCheckmarkCircleOutline,
  IoShieldCheckmarkOutline,
  IoHourglassOutline,
} from "react-icons/io5";

const ErrorDetails = () => {
  const {
    projects,
    setProjects,
    selectProject,
    selectedProject,
    fetchProjectsForUser,
  } = useProjects();
  const [errorData, setErrorData] = useState<ErrorData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [resolved, setResolved] = useState<boolean>(false);
  const [stackFrames, setStackFrames] = useState<FrameWithContext[]>([]);
  const [expandedFrameIndex, setExpandedFrameIndex] = useState(0);
  const location = useLocation();
  const { handled, time } = location.state || {};

  const { project_uuid: projectUuid, error_uuid: errorUuid } = useParams();

  const navigate = useNavigate();
  const toast = useToast();

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
    const fetchErrorData = async () => {
      try {
        setIsLoading(true);
        const response = await getError(projectUuid, errorUuid);

        const { data } = response;
        
        setErrorData(data);
        setResolved(data.resolved);

        if (data.stack_trace && selectedProject) {
          const frames = parseStackTrace(
            data.stack_trace,
            selectedProject.platform
          );
          const contexts = data.contexts || [];

          const framesWithContext = frames.map((frame) => {
            const codeContext =
              contexts.find((context) => frame.includes(context.file)) || null;
            return {
              frame,
              codeContext,
            };
          });

          setStackFrames(framesWithContext);
        }
      } catch (e) {
        setLoadingError("No error data available.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchErrorData();
  }, [selectedProject]);

  const handleFrameClick = (index: number) => {
    setExpandedFrameIndex(index);
  };

  const handleToggleResolved = async () => {
    let resolvedPayload = resolved ? false : true;

    try {
      await toggleError(projectUuid, errorUuid, resolvedPayload);
      setResolved(resolvedPayload);
    } catch (e) {
      alert("Could not toggle resolved state of error");
    }
  };

  const removeError = async () => {
    try {
      await deleteError(projectUuid, errorUuid);

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
    } catch (e) {
      toast({
        title: "Deletion Error",
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
      "Marking this error as resolved will permanently remove it from the database. Would you like to continue?"
    );

    if (confirmAction) {
      removeError();
    }
  };

  const handleReturnToErrors = () => {
    navigate(`/projects/${projectUuid}/issues`, {
      state: {
        handled: handled,
        time: time,
      },
    });
  };

  if (loadingError) {
    return (
      <WarningModal
        isOpen={true}
        onClose={() => setLoadingError(null)}
        errorMessage={loadingError}
      />
    );
  }

  if (!errorData) {
    return (
      <Center>
        <Text fontSize="2rem" p={8}>
          No Error Data Avaialable
        </Text>
      </Center>
    )    
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4} px={4}>
        {/* Return to Errors Button */}
        <Button
          size="md"
          leftIcon={<IoArrowBackOutline />}
          fontWeight="light"
          onClick={handleReturnToErrors}
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
            bg={resolved ? "red.400" : "green.400"}
            _hover={{
              bg: resolved ? "red.500" : "green.500",
            }}
          >
            {resolved ? <>Mark As Unresolved</> : <>Mark As Resolved</>}
          </Button>

          {/* Delete Error Button */}
          <Button
            size="md"
            onClick={handleDeleteClick}
            leftIcon={<IoTrashOutline />}
            fontWeight="light"
            bg="red.400"
            _hover={{ bg: "red.500" }}
          >
            Delete Issue
          </Button>
        </Flex>
      </Flex>

      <Box
        // borderWidth={1}
        borderRadius="md"
        overflow="hidden"
        textAlign="left"
        mt={8}
      >
        <Stack>
          <Flex justify="space-between" mb={4} px={4}>
            <HStack>
              <Heading as="h2" fontSize="2rem" mr={2}>
                {errorData.name}
              </Heading>
              <Text fontSize="1.5rem" color="gray">
                {errorData.method ? errorData.method.toUpperCase() : ""}
              </Text>
              <Text fontSize="1.5rem" color="gray">
                {errorData.path ? errorData.path : ""}
              </Text>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              {new Date(errorData.created_at).toLocaleString()}
            </Text>
          </Flex>
          <Flex justify="space-between" align="center" mb={4} px={4}>
            <HStack flex="2">
              <Text>{errorData.message}</Text>
              <Icon
                as={
                  errorData.handled === false
                    ? IoWarningOutline
                    : IoShieldCheckmarkOutline
                }
                color={errorData.handled === false ? "red.500" : "green.500"}
              />
              <Text
                fontSize="md"
                fontWeight="bold"
                color={errorData.handled === false ? "red.500" : "green.500"}
              >
                {errorData.handled === false ? "Unhandled" : "Handled"}
              </Text>
            </HStack>
            <Flex gap={12}>
              <Flex direction="column" align="center">
                <Text>Events</Text>
                <Text as="span" fontSize="xl" color="blue.500">
                  {errorData.total_occurrences}
                </Text>
              </Flex>
              <Flex direction="column" align="center">
                <Text>Users</Text>
                <Text as="span" fontSize="xl" color="blue.500">
                  {errorData.distinct_users}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Table my={8}>
            <Tbody>
              <Tr>
                <Th fontSize="sm" fontWeight="bold" maxW="500px">
                  File
                </Th>
                <Th fontSize="sm" fontWeight="bold">
                  Line
                </Th>
                {errorData.col_number && (
                  <Th fontSize="sm" fontWeight="bold">
                    Column
                  </Th>
                )}
                {errorData.browser && errorData.browser !== "unknown" && (
                  <Th fontSize="sm" fontWeight="bold">
                    Browser
                  </Th>
                )}
                {errorData.runtime && errorData.runtime !== "unknown" && (
                  <Th fontSize="sm" fontWeight="bold">
                    Runtime
                  </Th>
                )}
                <Th fontSize="sm" fontWeight="bold">
                  OS
                </Th>
              </Tr>
              <Tr>
                <Td
                  fontSize="xs"
                  fontWeight="light"
                  fontFamily="monospace"
                  maxW="500px"
                  whiteSpace="normal"
                >
                  {errorData.file}
                </Td>
                <Td fontSize="xs" fontWeight="light" fontFamily="monospace">
                  {errorData.line_number}
                </Td>
                {errorData.col_number && (
                  <Td fontSize="xs" fontWeight="light" fontFamily="monospace">
                    {errorData.col_number}
                  </Td>
                )}
                {errorData.browser && errorData.browser !== "unknown" && (
                  <Td fontSize="xs" fontWeight="light" fontFamily="monospace">
                    {errorData.browser}
                  </Td>
                )}
                {errorData.runtime && errorData.runtime !== "unknown" && (
                  <Td fontSize="xs" fontWeight="light" fontFamily="monospace">
                    {errorData.runtime}
                  </Td>
                )}
                <Td fontSize="xs" fontWeight="light" fontFamily="monospace">
                  {errorData.os && errorData.os !== "unknown"
                    ? errorData.os
                    : "unknown"}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Stack>
      </Box>
      <Box mt={6} px={4} textAlign="left">
        <Text as="h3" fontSize="lg" fontWeight="bold" mb={2}>
          Stack Trace
        </Text>
        {stackFrames.map((item, index) => (
          <Box key={index} mb={2}>
            <Box
              padding={2}
              bg={expandedFrameIndex === index ? "gray.500" : "gray.100"}
              color={expandedFrameIndex === index ? "white" : "black"}
              cursor="pointer"
              onClick={() => handleFrameClick(index)}
            >
              <Text variant="light">{item.frame}</Text>
            </Box>
            <Collapse in={expandedFrameIndex === index} animateOpacity>
              <Box padding={4} borderWidth={1} backgroundColor="gray.50">
                <CodeContextDisplay codeContext={item.codeContext} />
              </Box>
            </Collapse>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ErrorDetails;
