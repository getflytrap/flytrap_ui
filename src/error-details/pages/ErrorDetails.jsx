import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Table,
  Tbody,
  Tr,
  Td,
  Center,
  Spinner,
} from "@chakra-ui/react";

const ErrorDetails = () => {
  const [fetchedError, setFetchedError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

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

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box>
      <Heading as="h2">Error Details</Heading>
      <Box borderWidth={1} borderRadius="md">
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