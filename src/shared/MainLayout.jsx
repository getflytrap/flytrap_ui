import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { AuthContext } from "../contexts/auth-context";

const MainLayout = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.logout();
    navigate("/login");
  };

  return (
    <Box>
      <Flex as="header" direction="row" padding="1rem" whiteSpace="nowrap">
        <Heading size="2xl" textAlign="center">
          Fly Trap
        </Heading>
        <Flex width="100%" justifyContent="flex-end" marginTop="1rem">
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
