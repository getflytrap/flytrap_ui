import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Table,
  Tbody,
  Tr,
  Td,
  Flex,
  Center,
  Spinner,
  useToast
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const ErrorDetails = ({ selectedProject }) => {
  const [fetchedError, setFetchedError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [resolved, setResolved] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      // Simulate data fetching
      const data = {
        error_id: 1,
        name: "Database Connection Error",
        message: "Unable to connect to the database.",
        created_at: "2024-10-03T09:20:00Z",
        stack_trace: "Error stack trace...",
      };
      setFetchedError(data);
      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  async function handleToggleResolved() {
    let resolvedPayload = resolved ? false : true;

    try {
      const data = await toggleError(
        selectedProject.project_id,
        id,
        resolvedPayload
      );

      // so that 'resolved' is only updated in state if API call was successful
      setResolved(resolvedPayload);
    } catch (e) {
      alert("Could not toggle resolved state of error");
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
      }
    }
    return result;
  }

  const existingProperties = renameAndFilterProperties();

  const handleReturnToErrors = () => {
    navigate("/errors", {
      state: {
        project_id: fetchedError.project_id,
        handled: location.state?.handled,
        time: location.state?.time,
      },
    });
  };

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
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
        <Button colorScheme="pink" size="lg" onClick={/* To be implemented */}>
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
            {existingProperties.map(([key, value]) => (
              <Tr key={key}>
                <Td fontWeight="bold">{key}</Td>
                <Td>{value}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default ErrorDetails