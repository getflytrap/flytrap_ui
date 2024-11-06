import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Center, Spinner } from "@chakra-ui/react";

export default function ErrorDetails() {
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
      {/* Display fetchedError data here */}
    </Box>
  );
}
