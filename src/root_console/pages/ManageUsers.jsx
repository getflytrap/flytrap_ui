import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Heading } from "@chakra-ui/react";

const ManageUsers = () => {
  return (
    <Box p={5}>
      <Box textAlign="left" mb={6}>
        <Link to="/root-console">
          <Button colorScheme="purple" size="lg" leftIcon={<ArrowBackIcon />}>
            Return
          </Button>
        </Link>
      </Box>
      <Heading as="h1" size="2xl" mb={6} textAlign="center">
        Manage Users
      </Heading>
    </Box>
  );
};

export default ManageUsers;
