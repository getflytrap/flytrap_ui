import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Table,
  Tbody,
  Tr,
  Td,
  Flex,
  useToast,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  DeleteIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons"; // Import the icons
import WarningModal from "../../shared/WarningModal";
import { deleteRejection, getRejection, toggleRejection } from "../../services";
import { useProjects } from "../../hooks/useProjects";
import { Rejection } from "../../types";
import LoadingSpinner from "../../shared/LoadingSpinner";

const RejectionDetails = () => {
  const { projects, selectProject, selectedProject, fetchProjectsForUser } =
    useProjects();
  const [rejectionData, setRejectionData] = useState<Rejection | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [resolved, setResolved] = useState<boolean>(false);
  const location = useLocation();
  const { handled, time } = location.state || {};

  const { project_uuid: projectUuid, rejection_uuid: rejectionUuid } =
    useParams();

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchRejectionData = async () => {
      try {
        setIsLoading(true);
        const { data } = await getRejection(projectUuid, rejectionUuid);
        setRejectionData(data);
        setResolved(data.resolved);
      } catch (e) {
        setLoadingError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRejectionData();
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

  const handleToggleResolved = async () => {
    let resolvedPayload = resolved ? false : true;

    try {
      await toggleRejection(projectUuid, rejectionUuid, resolvedPayload);
      setResolved(resolvedPayload);
    } catch (e) {
      alert("Could not toggle resolved state of rejection");
    }
  };

  const removeRejection = async () => {
    try {
      await deleteRejection(projectUuid, rejectionUuid);
      toast({
        title: "Successful Deletion",
        description: "Rejection successfully deleted",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      navigate(`/projects/${projectUuid}/issues`);
    } catch (e) {
      toast({
        title: "Deletion Error",
        description: "Rejection could not be deleted",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleDeleteClick = () => {
    const confirmAction = window.confirm(
      "Marking this rejection as resolved will permanently remove it from the database. Would you like to continue?"
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
        {/* Return to Issues Button */}
        <Button
          size="md"
          onClick={handleReturnToIssues}
          bg="gray.200"
          _hover={{ bg: "gray.100" }}
        >
          <ArrowBackIcon mr={2} />
          Return to Issues
        </Button>

        {/* Mark as Resolved Button */}
        <Button
          size="md"
          onClick={handleToggleResolved}
          bg={resolved ? "red.400" : "brand.400"}
          _hover={{
            bg: resolved ? "red.300" : "green.200",
          }}
        >
          {resolved ? (
            <>
              <CloseIcon mr={2} /> Mark As Unresolved
            </>
          ) : (
            <>
              <CheckIcon mr={2} /> Mark As Resolved
            </>
          )}
        </Button>

        {/* Delete Rejection Button */}
        <Button
          size="md"
          onClick={handleDeleteClick}
          bg="red.400"
          _hover={{ bg: "red.300" }}
        >
          <DeleteIcon mr={2} /> Delete Rejection
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
            <Tr bg="white">
              <Td fontWeight="bold" paddingY={2}>
                Value
              </Td>
              <Td p="5px 50px" whiteSpace="normal">
                {rejectionData.value}
              </Td>
            </Tr>
            <Tr bg="gray.50">
              <Td fontWeight="bold" paddingY={2}>
                Created At
              </Td>
              <Td p="5px 50px" whiteSpace="normal">
                {new Date(rejectionData.created_at).toLocaleString()}
              </Td>
            </Tr>
            <Tr bg="white">
              <Td fontWeight="bold" paddingY={2}>
                Handled
              </Td>
              <Td p="5px 50px" whiteSpace="normal">
                {rejectionData.handled ? "Yes" : "No"}
              </Td>
            </Tr>
            <Tr bg="gray.50">
              <Td fontWeight="bold" paddingY={2}>
                Resolved
              </Td>
              <Td p="5px 50px" whiteSpace="normal">
                {rejectionData.resolved ? "Yes" : "No"}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default RejectionDetails;
