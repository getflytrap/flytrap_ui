import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as postLoginData } from "../../services/auth/auth";
import { useAuth } from "../../hooks/useAuth";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Divider,
  useToast,
} from "@chakra-ui/react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const data = await postLoginData(email, password);

      login(data.userUuid, data.firstName, data.lastName, data.isRoot);
      toast({
        title: "Successful Login",
        description: "You are successfully logged in",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      navigate("/projects");
    } catch (e) {
      console.log("error logging in: ", e);
      toast({
        title: "Login error",
        description: "User could not be logged in - check your inputs",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  return (
    <>
      <Heading as="h1" size="xl">
        Welcome to Fly Trap!
      </Heading>
      <Text
        fontSize="xl"
        m="50px"
        border="1px dashed gray"
        borderRadius="100px"
        p="30px"
        bg="gray.100"
      >
        LOGO
      </Text>
      <Box
        borderWidth="1px"
        borderColor="lightgray"
        p={6}
        borderRadius="md"
        width="50vw"
        maxWidth="600px"
        mx="auto"
        mt={10}
      >
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          Login
        </Heading>
        <Heading as="h3" size="md" mb={4} textAlign="center">
          Sign in as:
        </Heading>

        <FormControl isRequired mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>

        <Button colorScheme="green" mt={4} onClick={handleSubmit} width="full">
          Submit
        </Button>
      </Box>
    </>
  );
};

export default Login;
