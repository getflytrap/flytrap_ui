import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth-context";
import { postLoginData } from "../../services/data";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Divider,
  useToast,
} from "@chakra-ui/react";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const [userIsRootUser, setUserIsRootUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      async function postData() {
        const data = await postLoginData(email, password);
        console.log("login data", data);
        auth.login(data.access_token);

        toast({
          title: "Successful Login",
          description: "You are successfully logged in",
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        if (userIsRootUser) {
          navigate("/admin-console");
        } else {
          navigate("/");
        }
      }

      postData();
    } catch {
      toast({
        title: "Login error",
        description: "User could not be logged in - check your inputs",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  async function prevPage() {
    fetchProjects(currentPage - 1);
  }

  async function nextPage() {
    fetchProjects(currentPage + 1);
  }

  const handleChangePassword = () => {
    alert("This will be replaced with a 'Change Password' modal");
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
        <RadioGroup
          onChange={(value) => {
            setUserIsRootUser(value === "root");
          }}
          value={userIsRootUser ? "root" : "account"}
        >
          <Stack spacing={4}>
            <HStack justify="center">
              <Radio value="root">Root User</Radio>
              <Radio value="account" selected>
                Account User
              </Radio>
            </HStack>
          </Stack>
        </RadioGroup>

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

        <Divider my={4} />

        <Button colorScheme="blue" onClick={handleChangePassword} width="full">
          Change Password
        </Button>
      </Box>
    </>
  );
}

export default Login