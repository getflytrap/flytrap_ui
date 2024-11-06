import { useState } from "react";
import {
  Box,
  Button,
  Select,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

const DeleteUser = ({ users }) => {
  const [selectedUserName, setSelectedUserName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      borderWidth="1px"
      borderColor="lightgray"
      p={6}
      borderRadius="md"
      width="400px"
      maxWidth="600px"
      mx="auto"
      mt={10}
    >
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Delete User
      </Heading>

      <Text mb={4} textAlign="center">
        Choose a User to Delete
      </Text>

      <Select
        placeholder="Select user"
        value={selectedUserName}
        onChange={(e) => setSelectedUserName(e.target.value)}
        mb={4}
      >
        {users.map((user) => (
          <option key={user.id} value={`${user.first_name} ${user.last_name}`}>
            {`${user.first_name} ${user.last_name}`}
          </option>
        ))}
      </Select>

      <Button
        colorScheme="red"
        width="full"
        onClick={onOpen}
        isDisabled={!selectedUserName}
      >
        Delete User
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to delete {selectedUserName}?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={/* deletion logic here */}>
              Delete User
            </Button>
            <Button ml={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DeleteUser;
