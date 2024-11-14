import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import { User } from "../../types/index";
import { getUsers } from "../../services/index";

import CreateUser from "../components/CreateUser";
import DeleteUser from "../components/DeleteUser";
import AssignUsers from "../components/AssignUsers";

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await getUsers();
      console.log("users here", data);
      setUsers(data);
    }
    try {
      fetchUsers();
    } catch {
      alert("Could not fetch users");
    }
  }, []);

  return (
    <Box p={5} borderRadius="20px" bg="gray.200">
      <Box textAlign="left" mb={6}>
        <Link to="/root-console">
          <Button colorScheme="purple" size="lg" leftIcon={<ArrowBackIcon />}>
            Return
          </Button>
        </Link>
      </Box>
      <Heading as="h1" size="2xl" mb={6} textAlign="center">
        Manage Users
      </Heading>

      <Stack spacing={4}>
        <Stack direction={{ base: "column", md: "row" }} spacing={4}>
          <Box flex="1" p={5} textAlign="center">
            <CreateUser setUsers={setUsers} />
          </Box>
          <Box flex="1" p={5} textAlign="center">
            <DeleteUser users={users} setUsers={setUsers} />
          </Box>
        </Stack>
        <Box flex="1" p={5} textAlign="center">
          <AssignUsers users={users} />
        </Box>
      </Stack>
    </Box>
  );
};

export default ManageUsers;
