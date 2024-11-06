import { useContext } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { AuthContext } from "../contexts/auth-context";

const MainLayout = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    auth.logout();
    navigate("/login");
  };

  const getButtonColor = (path) => {
    return location.pathname === path ? "purple" : "gray"; // Set color based on the current path
  };

  return (
    <Box>
      <Flex as="header" direction="row" padding="1rem" whiteSpace="nowrap">
        <Heading size="2xl" textAlign="center">
          Flytrap
        </Heading>
        <Flex width="100%" justifyContent="flex-end" marginTop="1rem">
          <Link to="/">
            <Button colorScheme={getButtonColor("/")} mx="10px">
              Projects
            </Button>
          </Link>
          <Link to="/root-console">
            <Button colorScheme={getButtonColor("/root-console")} mr="10px">
              Admin Console
            </Button>
          </Link>
          <Button onClick={handleSignOut} colorScheme="gray">
            Sign Out
          </Button>
        </Flex>
      </Flex>
      <Box padding="1rem">
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
