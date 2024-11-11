import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { login as postLoginData } from "../../services/auth/auth";
import { updatePassword } from "../../services/users/users";
import { jwtDecode } from "jwt-decode";
import { AccessTokenPayload } from "../../services/auth/authTypes";

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

const ChangePassword = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      async function postData() {
        const accessToken = await postLoginData(email, password);
        console.log("accessToken", accessToken);
        const tokenPayload: AccessTokenPayload = jwtDecode(accessToken);
        auth.login(tokenPayload.user_uuid);

        toast({
          title: "Successful Login",
          description: "You are successfully logged in",
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        onOpen();
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

  const handleCancel = () => {
    navigate("/login");
  };

  async function handleSubmitNewPassword() {
    if (auth.userUuid) {
      try {
        alert(newPassword);
        await updatePassword(auth.userUuid, newPassword);
        console.log("New password submitted:", newPassword);

        toast({
          title: "Successfully Changed Password",
          description: "You have successfully changed your password",
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        onClose();
        auth.logout();
        navigate("/login");
      } catch {
        toast({
          title: "Error Changing Password",
          description: "Could not change password",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  }

  return (
    <>
      <Heading as="h1" size="xl">
        Change Password{" "}
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
        <Heading as="h3" size="md" mb={4} textAlign="center">
          Enter Current Credentials:
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

        <Divider my={4} />

        <Button colorScheme="blue" onClick={handleCancel} width="full">
          Cancel
        </Button>
      </Box>

      {/* Modal for Changing Password */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Your Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitNewPassword}>
              Confirm Password Change
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePassword;
