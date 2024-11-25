import { useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  IconButton,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { IoTrashOutline } from "react-icons/io5";
import { deleteAccount } from "../../services/index";
import { User } from "../../types";

interface UserListProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

/**
 * Displays a list of users in a table format.
 * Allows the admin to delete a user through a confirmation modal.
 *
 * @param users - List of users to display.
 * @param setUsers - State updater for users list.
 */
const UserList = ({ users, setUsers }: UserListProps) => {
  const [selectedUser, setselectedUser] = useState<User | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  /**
   * Deletes the selected user from the database and updates the user list.
   */
  const deleteUser = async () => {
    try {
      if (!selectedUser) return;
      await deleteAccount(selectedUser.uuid);

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.uuid !== selectedUser.uuid),
      );
      toast({
        title: "Successful Deletion",
        description: "User Successfully Deleted",
        status: "success",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    } catch (error) {
      const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";

      toast({
        title: "Deletion Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    } finally {
      onClose();
      setselectedUser(null);
    }
  };

  /**
   * Opens the delete confirmation modal for the specified user.
   *
   * @param user - The user to delete.
   */
  const handleOpenDeleteModal = (user: User) => {
    setselectedUser(user);
    onOpen();
  };

  return (
    <Box overflowY="auto" p={6}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th isNumeric>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.uuid}>
              <Td>{`${user.first_name} ${user.last_name}`}</Td>
              <Td>{user.email}</Td>
              <Td isNumeric>
                <IconButton
                  icon={<IoTrashOutline />}
                  aria-label="Delete User"
                  colorScheme="red"
                  onClick={() => handleOpenDeleteModal(user)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            <Text>
              Are you sure you want to delete{" "}
              {`${selectedUser?.first_name} ${selectedUser?.last_name}`}?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={deleteUser}>
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

export default UserList;
