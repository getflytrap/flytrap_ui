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
  Center,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import WarningModal from "../../shared/WarningModal";
import { deleteError, getError } from "../../services";

const ErrorDetails = () => {
  const [fetchedError, setFetchedError] = useState({});
  const [loadingError, setLoadingError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [resolved, setResolved] = useState(false);
  const location = useLocation();

  const { pid, eid } = useParams();
  const projectId = pid;
  const errorId = eid;

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    try {
      setIsLoading(true);

      async function fetchData() {
        console.log("ids", projectId, errorId);

        const { data } = await getError(projectId, errorId);

        // const data = {
        //   uuid: "sample-uuid-1234-5678",
        //   name: "DUMMY Database Connection Error",
        //   message: "Unable to connect to the database.",
        //   created_at: "2024-10-03T09:20:00Z",
        //   line_number: 45,
        //   col_number: 15,
        //   project_uuid: "123e4567-e89b-12d3-a456-426614174000",
        //   stack_trace: "Traceback (most recent call last):...",
        //   handled: false,
        //   resolved: false,
        // };

        setFetchedError(data);
        setResolved(data.resolved);

        // to set selectedProject if user begins at this route - necessary?

        // if (selectedProject.project_id !== data.project_id) {
        //   const currentProject = projects.find(
        //     (project) => project.project_id === data.project_id
        //   );
        //   setSelectedProject(currentProject);
        // }
      }
      fetchData();
    } catch (e) {
      setLoadingError(e.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function handleToggleResolved() {
    let resolvedPayload = resolved ? false : true;

    try {
      const data = await toggleError(projectId, errorId, resolvedPayload);

      // so that 'resolved' is only updated in state if API call was successful
      setResolved(resolvedPayload);
    } catch (e) {
      alert("Could not toggle resolved state of error");
    }
  }

  async function removeError() {
    try {
      const data = await deleteError(projectId, errorId);
      toast({
        title: "Successful Deletion",
        description: "Error successfully deleted",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      navigate("/errors");
    } catch (e) {
      toast({
        title: "Deletion Error",
        description: "Error could not be created",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  function renameAndFilterProperties() {
    const result = [];
    for (let pair of Object.entries(fetchedError)) {
      if (!pair[1]) continue;
      switch (pair[0]) {
        case "error_id":
          result.push(["Id", pair[1]]);
          break;
        case "name":
          result.push(["Name", pair[1]]);
          break;
        case "message":
          result.push(["Message", pair[1]]);
          break;
        case "created_at":
          result.push(["Created At", pair[1]]);
          break;
        case "line_number":
          result.push(["Line Number", pair[1]]);
          break;
        case "col_number":
          result.push(["Column Number", pair[1]]);
          break;
        case "handled":
          result.push(["Handled", pair[1]]);
          break;
      }
    }
    return result;
  }

  const existingProperties = renameAndFilterProperties();

  const handleDeleteClick = () => {
    const confirmAction = window.confirm(
      "Marking this error as resolved will permanently remove it from the database. Would you like to continue?"
    );

    if (confirmAction) {
      removeError();
    }
  };

  const handleReturnToErrors = () => {
    navigate("/errors", {
      state: {
        project_id: fetchedError.uuid,
        handled: location.state?.handled,
        time: location.state?.time,
      },
    });
  };

  if (!fetchedError) {
    return <Heading>No Data</Heading>;
  }

  if (loadingError) {
    return (
      <WarningModal
        isOpen={true}
        onClose={() => setLoadingError(false)}
        errorMessage={loadingError.message}
      />
    );
  }

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

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
          {fetchedError.stack_trace ? fetchedError.stack_trace : "No Data"}
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorDetails;
