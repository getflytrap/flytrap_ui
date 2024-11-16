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
} from "@chakra-ui/react";
import {
  IoTrashOutline,
  IoCloseOutline,
  IoCheckmarkOutline,
  IoArrowBackOutline,
  IoWarningOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
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
            leftIcon={resolved ? <IoCloseOutline /> : <IoCheckmarkOutline />}
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
              <Heading as="h2" fontSize="1.5rem">
                Rejected Promise: {rejectionData.value}
              </Heading>
              <Icon
                as={
                  rejectionData.handled === false
                    ? IoWarningOutline
                    : IoCheckmarkCircleOutline
                }
                color={rejectionData.handled === false ? "red.500" : "green.500"}
              />
              <Text
                fontSize="md"
                fontWeight="bold"
                color={rejectionData.handled === false ? "red.500" : "green.500"}
              >
                {rejectionData.handled === false ? "Unhandled" : "Handled"}
              </Text>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              {new Date(rejectionData.created_at).toLocaleString()}
            </Text>
          </Flex>

        </Stack>
      </Box>
    </Box>
  );
};

export default RejectionDetails;
