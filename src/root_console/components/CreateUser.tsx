import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { createAccount } from "../../services/index";
import { User } from "../../types";

interface CreateUserProps {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const CreateUser = ({ setUsers }: CreateUserProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");

  const toast = useToast();

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmedPassword("");
  };

  async function postNewUserData() {
    try {
      const credentials = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        confirmed_password: confirmedPassword,
      };

      const data = await createAccount(credentials);

      const newUser = {
        uuid: data.uuid,
        first_name: firstName,
        last_name: lastName,
        email: email,
        is_root: false,
      };

      setUsers((prevUsers) => [...prevUsers, newUser]);

      resetForm();

      toast({
        title: "Successful Creation",
        description: "User Successfully Created",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Creation error",
        description: "User could not be created",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  const validateInputs = () => {
    if (firstName.length === 0) {
      toast({
        title: "Invalid First Name",
        description: "First name must be at least 1 character long.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
    if (lastName.length === 0) {
      toast({
        title: "Invalid Last Name",
        description: "Last name must be at least 1 character long.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
    if (password.length < 8) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 8 characters long.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
    if (password !== confirmedPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    postNewUserData();
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
