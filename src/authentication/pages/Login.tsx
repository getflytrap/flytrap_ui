/**
 * Login Page component.
 * Provides a login form for users to authenticate. Redirects logged-in users to the projects page.
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { useAuth } from "../../hooks/useAuth";
import { login as postLoginData } from "../../services/auth/auth";
import transparent_logo from "../../assets/transparent_logo.png";


const Login = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/projects");
    }
  }, [isLoggedIn, navigate]);

  // Handle login form submission
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const data = await postLoginData(email, password);

      login(data.userUuid, data.firstName, data.lastName, data.isRoot);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";

      toast({
        title: "Login Failed",
        description: errorMessage,
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      bgGradient="linear(200deg, rgba(36,195,173,1) 0%, rgba(39,167,138,1) 14%, rgba(29,125,85,1) 35%, rgba(19,85,57,1) 67%, rgba(10,46,30,1) 100%);"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Image src={transparent_logo} alt="Flytrap Logo" height="200px" />
      <Box
        borderWidth="1px"
        borderColor="lightgray"
        p={6}
        borderRadius="md"
        width="50vw"
        maxWidth="600px"
        mx="auto"
        my={50}
        bg="gray.100"
      >
        <Heading as="h2" fontSize="1.5rem" mb={4} textAlign="center">
          Login
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

        <Button colorScheme="teal" mt={8} onClick={handleSubmit} width="full">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
