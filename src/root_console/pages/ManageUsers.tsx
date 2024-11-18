import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Heading, Flex, Divider, Container } from "@chakra-ui/react";
import { User } from "../../types/index";
import { getUsers } from "../../services/index";
import { IoArrowBackOutline } from "react-icons/io5";

import CreateUser from "../components/CreateUser";
import UserList from "../components/UserList";
import AssignUsers from "../components/AssignUsers";

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await getUsers();
      setUsers(data);
    }
    try {
      fetchUsers();
    } catch {
      alert("Could not fetch users");
    }
  }, []);

  return (
    <Box p={6} bg="gray.100">
      <Container maxWidth="1200px" mx="auto">
        <Flex mb={6} alignItems="center" justifyContent="space-between">
          <Link to="/projects">
            <Button
              size="md"
              leftIcon={<IoArrowBackOutline />}
              fontWeight="light"
              bg="gray.200"
              _hover={{ bg: "gray.100" }}
            >
              Return
            </Button>
          </Link>
          <Flex flex="1" justifyContent="center">
            <Heading as="h2" fontSize="2rem" my="30px">
              Manage Users
            </Heading>
          </Flex>
        </Flex>
  
        <Flex
          direction="column"
          bg="white"
          borderWidth="1px"
          borderColor="lightgray"
          borderRadius="md"
        >
          <CreateUser setUsers={setUsers} />
          <UserList users={users} setUsers={setUsers} />
          {/* <Flex justifyContent="space-around" gap={12} mb={8}>
          </Flex> */}
          <Divider />
          <AssignUsers users={users} />
        </Flex>
      </Container>
    </Box>
  );
};

export default ManageUsers;
