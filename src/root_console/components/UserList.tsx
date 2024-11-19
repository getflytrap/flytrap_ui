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
import { User } from "../../types";
import { deleteAccount } from "../../services/index";
import { IoTrashOutline } from "react-icons/io5";

interface UserListProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserList = ({ users, setUsers }: UserListProps) => {
  const [selectedUser, setselectedUser] = useState<User | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

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
    } catch (e) {
      toast({
        title: "Deletion Error",
        description: "User could not be deleted",
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    }
    onClose();
  };

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
