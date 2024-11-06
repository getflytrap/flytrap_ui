import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const RootConsole = () => {
  return (
    <Box p={5}>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        Admin Console
      </Heading>
    </Box>
  );
};

export default RootConsole;