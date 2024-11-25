import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Flex,
  Divider,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  useToast,
} from "@chakra-ui/react";
import { IoArrowBackOutline } from "react-icons/io5";
import { getUsers } from "../../services/index";
import { User } from "../../types/index";
import CreateUser from "../components/CreateUser";
import UserList from "../components/UserList";
import AssignUsers from "../components/AssignUsers";

/**
 * ManageUsers component allows admins to view and manage users, including:
 * - Viewing the list of users.
 * - Creating new users.
 * - Assigning users to projects.
 */
const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const toast = useToast();

  /**
   * Fetches the list of users from the backend on component mount.
   * Displays an error notification if the fetch fails.
   */
  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred.";

        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 3000,
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
        });
      }
    }

    fetchUsers();
  }, []);

  return (
    <Box bg="gray.100" height="100vh">
      <Container maxWidth="1200px" mx="auto">
        <Flex mb={6} alignItems="center" justifyContent="space-between">
          <Box flex="1">
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
          </Box>
          <Flex flex="2" justifyContent="center">
            <Heading as="h2" fontSize="2rem" my="30px">
              Admin Console
            </Heading>
          </Flex>
          <Box flex="1"></Box>
        </Flex>

        <Flex direction="column" bg="white" borderRadius="md" p={4}>
          <Tabs isFitted variant="unstyled" colorScheme="teal">
            <TabList>
              <Tab>User Management</Tab>
              <Tab>Project Assignments</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="teal.500"
              borderRadius="1px"
            />

            <TabPanels>
              <TabPanel>
                <Flex direction="column" gap={4}>
                  <CreateUser setUsers={setUsers} />
                  <Divider />
                  <UserList users={users} setUsers={setUsers} />
                </Flex>
              </TabPanel>

              <TabPanel>
                <AssignUsers users={users} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Container>
    </Box>
  );
};

export default ManageUsers;
