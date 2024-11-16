import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  Container
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const RootConsole = () => {
  const direction =
    useBreakpointValue<"row" | "column">({ base: "column", md: "row" }) ||
    "column";

  return (
    <Box p={5} bg="gray.100" height="100%">
      <Container maxWidth="1200px" mx="auto">
        <Heading as="h2" fontSize="3rem" textAlign="center" mb={8}>
          Admin Console
        </Heading>
  
        <Stack direction={direction} spacing={10} align="center">
          <Box flex="1" p={5} textAlign="center">
            <Heading as="h2" size="lg" mb={4}>
              Error Dashboard
            </Heading>
            <Text mb={4}>Monitor and manage errors here.</Text>
            <Link to="/projects">
              <Button
                bg="brand.500"
                color="white"
                _hover={{
                  bg: "brand.700",
                }}
              >
                Go to Dashboard
              </Button>
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
              <Button
                bg="brand.500"
                color="white"
                _hover={{
                  bg: "brand.700",
                }}
              >
                Go To User Management Console
              </Button>
            </Link>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default RootConsole;
