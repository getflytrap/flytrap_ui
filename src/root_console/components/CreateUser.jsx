import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

const CreateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
  };

  return (
    <Box
      borderWidth="1px"
      borderColor="lightgray"
      p={6}
      borderRadius="md"
      width="400px"
      mx="auto"
      mt={10}
    >
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Create User
      </Heading>

      <FormControl isRequired mt={4}>
        <FormLabel>First Name</FormLabel>
        <Input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel>Last Name</FormLabel>
        <Input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
          placeholder="Confirm password"
        />
      </FormControl>

      <Button colorScheme="green" mt={4} onClick={handleSubmit} width="full">
        Submit
      </Button>
    </Box>
  );
};

export default CreateUser;
