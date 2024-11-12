import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { updatePassword } from "../../services/users/users";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Divider,
  useToast,
} from "@chakra-ui/react";

const ChangePassword = () => {
  const { userUuid, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleCancel = () => {
    navigate("/projects");
  };

  function isValidPassword() {
    if (newPassword.length < 8) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 8 characters long",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return false;
    } else if (newPassword !== confirmNewPassword) {
      toast({
        title: "Invalid Password",
        description: "Password values do not match",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return false;
    }

    return true;
  }

  async function handleSubmitNewPassword() {
    if (!isValidPassword()) {
      return;
    }

    if (userUuid) {
      try {
        await updatePassword(userUuid, newPassword);
        console.log("New password submitted:", newPassword);

        toast({
          title: "Successfully Changed Password",
          description: "You have successfully changed your password",
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        logout();
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
      <Heading as="h1" size="xl" color="white">
        Change Password{" "}
      </Heading>
      <Box
        borderWidth="1px"
        borderColor="lightgray"
        p={6}
        borderRadius="md"
        width="50vw"
        maxWidth="600px"
        mx="auto"
        mt={10}
        bg="white"
      >
        <FormControl isRequired mt={4}>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
          />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm your new password"
          />
        </FormControl>

        <Button
          colorScheme="green"
          mt={4}
          onClick={handleSubmitNewPassword}
          width="full"
        >
          Confirm Password Change
        </Button>

        <Divider my={4} />

        <Button colorScheme="blue" onClick={handleCancel} width="full">
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default ChangePassword;
