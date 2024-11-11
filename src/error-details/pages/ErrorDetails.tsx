import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Heading,
  Table,
  Tbody,
  Tr,
  Td,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import WarningModal from "../../shared/WarningModal";
import { deleteError, getError, toggleError } from "../../services";
import { useProjects } from "../../hooks/useProjects";
import { ErrorData } from "../../types";
import { renameAndFilterProperties } from "../../helpers";
import LoadingSpinner from "../../shared/LoadingSpinner";

const ErrorDetails = () => {
  const { projects, selectProject, selectedProject, fetchProjectsForUser } =
    useProjects();
  const [errorData, setErrorData] = useState<ErrorData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [resolved, setResolved] = useState<boolean>(false);
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

  const existingProperties = renameAndFilterProperties(errorData);

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

      navigate(`/projects/${projectUuid}/errors`);
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
    navigate(`/projects/${projectUuid}/errors`, {
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
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Button colorScheme="purple" size="lg" onClick={handleReturnToErrors}>
          <ArrowBackIcon mr={2} />
          Return to Errors
        </Button>
        <Button
          colorScheme={resolved ? "pink" : "green"}
          size="lg"
          onClick={handleToggleResolved}
        >
          {resolved ? "Mark As Unresolved" : "Mark As Resolved"}
        </Button>
        <Button colorScheme="pink" size="lg" onClick={handleDeleteClick}>
          Delete Error
        </Button>
      </Flex>

      <Box
        borderWidth={1}
        borderRadius="md"
        overflow="hidden"
        margin="30px 20px"
      >
        <Table variant="simple">
          <Tbody>
            {existingProperties.map(([key, value], index) => (
              <Tr key={key} bg={index % 2 === 0 ? "gray.50" : "white"}>
                <Td fontWeight="bold" paddingY={2}>
                  {key}
                </Td>
                <Td p="5px 50px" whiteSpace="normal">
                  {value}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box mt={4}>
        <Text as="h3" fontSize="lg" fontWeight="bold" mb={2}>
          Stack Trace
        </Text>
        <Box
          padding={10}
          borderWidth={1}
          borderRadius="md"
          backgroundColor="gray.100"
          whiteSpace="pre-wrap"
        >
          {errorData.stack_trace ? errorData.stack_trace : "No Data"}
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorDetails;
