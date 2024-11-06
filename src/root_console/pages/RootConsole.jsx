import React from "react";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const RootConsole = () => {
  return (
    <Box p={5}>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        Admin Console
      </Heading>

      <Box flex="1" p={5} textAlign="center">
        <Heading as="h2" size="lg" mb={4}>
          Error Dashboard
        </Heading>
        <Text mb={4}>Monitor and manage errors here.</Text>
        <Link to="/">
          <Button colorScheme="teal">Go to Dashboard</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default RootConsole;