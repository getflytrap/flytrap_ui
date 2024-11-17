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
  IoCloseOutline,
  IoCheckmarkOutline,
  IoArrowBackOutline,
  IoWarningOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

const ErrorDetails = () => {
  const { projects, selectProject, selectedProject, fetchProjectsForUser } =
    useProjects();
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
    const fetchErrorData = async () => {
      try {
        setIsLoading(true);
        const { data } = await getError(projectUuid, errorUuid);
        setErrorData(data);
        setResolved(data.resolved);

        if (data.stack_trace) {
          const frames = parseStackTrace(data.stack_trace);
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
        setLoadingError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchErrorData();
  }, []);

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
  }, [projects, selectedProject]);

  // const existingProperties = renameAndFilterProperties(errorData);

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
      toast({
        title: "Successful Deletion",
        description: "Error successfully deleted",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      navigate(`/projects/${projectUuid}/issues`);
    } catch (e) {
      toast({
        title: "Deletion Error",
        description: "Error could not be created",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleDeleteClick = () => {
    const confirmAction = window.confirm(
      "Marking this error as resolved will permanently remove it from the database. Would you like to continue?",
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

  if (!errorData) {
    return <Heading>No Data</Heading>;
  }

  if (loadingError) {
    return (
      <WarningModal
        isOpen={true}
        onClose={() => setLoadingError(null)}
        errorMessage={loadingError}
      />
    );
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
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
            leftIcon={resolved ? <IoCloseOutline /> : <IoCheckmarkOutline />}
            fontWeight="light"
            bg={resolved ? "red.400" : "brand.400"}
            _hover={{
              bg: resolved ? "red.300" : "green.200",
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
            _hover={{ bg: "red.300" }}
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
              <Text fontSize="1.5rem" color="gray">{errorData.method ? errorData.method.toUpperCase() : ""}</Text>
              <Text fontSize="1.5rem" color="gray">{errorData.path ? errorData.path : ""}</Text>
            </HStack>
              <Text fontSize="sm" color="gray.500">
                {new Date(errorData.created_at).toLocaleString()}
              </Text>
          </Flex>
          <Flex justify="space-between" align="center" mb={4} px={4}>
            <HStack>
              <Text>{errorData.message}</Text>
              <Icon
                  as={
                    errorData.handled === false
                      ? IoWarningOutline
                      : IoCheckmarkCircleOutline
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
          </Flex>
          <Table>
            <Tbody>
              <Tr>
                <Th fontSize="sm" fontWeight="bold" maxW="500px">
                  File
                </Th>
                <Th fontSize="sm" fontWeight="bold">
                  Line
                </Th>
                <Th fontSize="sm" fontWeight="bold">
                  Column
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
                <Td fontSize="xs" fontWeight="light" fontFamily="monospace">
                  {errorData.col_number}
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
