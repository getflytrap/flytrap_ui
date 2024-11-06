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