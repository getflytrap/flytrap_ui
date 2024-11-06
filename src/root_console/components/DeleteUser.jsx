import { useState } from "react";
import { Box, Button, Select, Heading, Text } from "@chakra-ui/react";

const DeleteUser = ({ users }) => {
  const [selectedUserName, setSelectedUserName] = useState("");

  return (
    <Box
      borderWidth="1px"
      borderColor="lightgray"
      p={6}
      borderRadius="md"
      width="400px"
      maxWidth="600px"
      mx="auto"
      mt={10}
    >
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Delete User
      </Heading>

      <Text mb={4} textAlign="center">
        Choose a User to Delete
      </Text>

      <Select
        placeholder="Select user"
        value={selectedUserName}
        onChange={(e) => setSelectedUserName(e.target.value)}
        mb={4}
      >
        {users.map((user) => (
          <option key={user.id} value={`${user.first_name} ${user.last_name}`}>
            {`${user.first_name} ${user.last_name}`}
          </option>
        ))}
      </Select>

      <Button colorScheme="red" width="full" isDisabled={!selectedUserName}>
        Delete User
      </Button>
    </Box>
  );
};

export default DeleteUser;
