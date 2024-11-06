import { Box, Button, Divider, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const RootConsole = () => {
  return (
    <Box p={5}>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        Admin Console
      </Heading>

      <Stack direction="row" spacing={10} align="flex-start">
        <Box flex="1" p={5} textAlign="center">
          <Heading as="h2" size="lg" mb={4}>
            Error Dashboard
          </Heading>
          <Text mb={4}>Monitor and manage errors here.</Text>
          <Link to="/">
            <Button colorScheme="teal">Go to Dashboard</Button>
          </Link>
        </Box>

        <Box>
          <Divider
            orientation="vertical"
            height="100px"
            borderColor="gray.300"
          />
        </Box>

        <Box flex="1" p={5} textAlign="center">
          <Heading as="h2" size="lg" mb={4}>
            Manage Users
          </Heading>
          <Stack spacing={4} align="center">
            <Text mb={4}>Create or remove users here.</Text>

            <Link to="/manage-users">
              <Button colorScheme="blue">Go To User Management Console</Button>
            </Link>
          </Stack>
        </Box>

      </Stack>
    </Box>
  );
};

export default RootConsole;