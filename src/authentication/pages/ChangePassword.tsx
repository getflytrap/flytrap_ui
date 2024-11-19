import { useState } from "react";
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
  Flex,
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
        description: "Password must be at least 8 characters long.",
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
      return false;
    } else if (newPassword !== confirmNewPassword) {
      toast({
        title: "Invalid Password",
        description: "Password values do not match.",
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
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
        toast({
          title: "Successfully Changed Password.",
          status: "success",
          duration: 3000,
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
        });

        logout();
        navigate("/login");
      } catch {
        toast({
          title: "Error Changing Password.",
          status: "error",
          duration: 3000,
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
        });
      }
    }
  }

  return (
    <Box bg="gray.100" px={6} height="100%" textAlign="center">
      <Heading as="h2" fontSize="1.5rem" my="30px">
        Change Your Password{" "}
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

        <Flex alignItems="center" justifyContent="space-around" mt={8} gap={4}>
          <Button
            colorScheme="teal"
            onClick={handleSubmitNewPassword}
            flex="1"
            maxWidth="200px"
          >
            Change Password
          </Button>

          <Button
            colorScheme="red"
            onClick={handleCancel}
            flex="1"
            maxWidth="200px"
          >
            Cancel
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default ChangePassword;
