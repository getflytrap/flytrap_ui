import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { createAccount } from "../../services/index";
import { User } from "../../types";
import { IoAddCircleOutline } from "react-icons/io5";

interface CreateUserProps {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const CreateUser = ({ setUsers }: CreateUserProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

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
      setIsModalOpen(false);

      toast({
        title: "Success",
        description: "User successfully created",
        status: "success",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Creation Error",
        description: "User could not be created",
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
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
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
      return false;
    }
    if (lastName.length === 0) {
      toast({
        title: "Invalid Last Name",
        description: "Last name must be at least 1 character long.",
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
      return false;
    }
    if (password.length < 8) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 8 characters long.",
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
      return false;
    }
    if (password !== confirmedPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
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
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
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
    <Box textAlign="right">
      <Button 
        colorScheme="teal" 
        my={8}
        mr={8}
        leftIcon={<IoAddCircleOutline />}
        onClick={() => setIsModalOpen(true)}
      >
        Create New User
      </Button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
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
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" onClick={handleSubmit}>
              Submit
            </Button>
            <Button colorScheme="red" onClick={() => setIsModalOpen(false)} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateUser;
