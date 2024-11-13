import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as postLoginData } from "../../services/auth/auth";
import { useAuth } from "../../hooks/useAuth";
import flytrap_logo from "../../assets/flytrap_logo.png";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Image,
  useToast,
} from "@chakra-ui/react";

const Login = () => {
  const { login, isLoggedIn } = useAuth();
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

  if (isLoggedIn) {
    navigate("/projects");
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      bg="brand.500"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Image src={flytrap_logo} alt="Flytrap Logo" height="150px" />
      <Box
        borderWidth="1px"
        borderColor="lightgray"
        p={6}
        borderRadius="md"
        width="50vw"
        maxWidth="600px"
        mx="auto"
        mt={10}
        bg="gray.100"
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
            bg="white"
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            bg="white"
          />
        </FormControl>

        <Button colorScheme="green" mt={4} onClick={handleSubmit} width="full">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
