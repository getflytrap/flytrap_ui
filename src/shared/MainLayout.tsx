import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth } from "../hooks/useAuth";
import flytrap_logo from "../assets/flytrap_logo.png";

const MainLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  const getButtonColor = (path: string) => {
    return location.pathname === path ? "purple" : "gray";
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      maxWidth={1280}
      padding="0 2rem"
      backgroundColor="#1D7D55"
    >
      <Flex
        as="header"
        direction="row"
        width="100%"
        justify="space-between"
        padding="1rem"
        whiteSpace="nowrap"
        alignItems="center"
      >
        <Heading size="2xl" textAlign="center">
          <Image src={flytrap_logo} alt="Flytrap Logo" height="150px" />
        </Heading>
        <Flex justifyContent="flex-end" alignItems="center" marginTop="1rem">
          <Link to="/">
            <Button colorScheme={getButtonColor("/")} mx="10px">
              Projects
            </Button>
          </Link>

          <Menu>
            <MenuButton
              as={Button}
              colorScheme="gray"
              rightIcon={<ChevronDownIcon />}
              mx="10px"
            >
              Account
            </MenuButton>
            <MenuList
              backgroundColor="white"
              boxShadow="lg"
              borderRadius="8px"
              padding="1rem"
              width="200px"
              marginTop="10px"
            >
              <MenuItem isDisabled>
                <Text fontSize="sm">
                  Signed in as {user?.username || "Guest"}
                </Text>
              </MenuItem>
              <Link to="/change-password">
                <MenuItem
                  backgroundColor="transparent"
                  _hover={{ backgroundColor: "#f0f0f0" }}
                  padding="10px"
                  margin="5px 0"
                >
                  Change Password
                </MenuItem>
              </Link>
              <Link to="/root-console">
                <MenuItem
                  backgroundColor="transparent"
                  _hover={{ backgroundColor: "#f0f0f0" }}
                  padding="10px"
                  margin="5px 0"
                >
                  Admin Console
                </MenuItem>
              </Link>
            </MenuList>
          </Menu>

          {/* Sign Out Button */}
          <Button onClick={handleSignOut} colorScheme="gray">
            Sign Out
          </Button>
        </Flex>
      </Flex>

      <Box
        padding="1rem"
        width="100%"
        flex="1"
        overflowY="auto"
        display="flex"
        flexDirection="column"
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
