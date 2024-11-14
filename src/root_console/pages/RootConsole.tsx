import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const RootConsole = () => {
  const direction =
    useBreakpointValue<"row" | "column">({ base: "column", md: "row" }) ||
    "column";

  return (
    <Box p={5} bg="white" borderRadius="20px" maxW="1200px" mx="auto">
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        Admin Console
      </Heading>

      <Stack direction={direction} spacing={10} align="center">
        <Box flex="1" p={5} textAlign="center">
          <Heading as="h2" size="lg" mb={4}>
            Error Dashboard
          </Heading>
          <Text mb={4}>Monitor and manage errors here.</Text>
          <Link to="/projects">
            <Button bg="green.300">Go to Dashboard</Button>
          </Link>
        </Box>

        {/* Divider between the columns, only visible on larger screens */}
        {direction === "row" && (
          <Box>
            <Divider
              orientation="vertical"
              height="100px"
              borderColor="gray.300"
            />
          </Box>
        )}

        <Box flex="1" p={5} textAlign="center">
          <Heading as="h2" size="lg" mb={4}>
            Manage Users
          </Heading>
          <Text mb={4}>Create or remove users here.</Text>

          <Link to="/manage-users">
            <Button bg="green.300">Go To User Management Console</Button>
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default RootConsole;
