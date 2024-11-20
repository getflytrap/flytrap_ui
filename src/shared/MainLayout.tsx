import { useContext } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
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
// import flytrap_logo from "../assets/flytrap_logo.png";
import transparent_logo from "../assets/transparent_logo.png";
import { BsFolder, BsPerson } from "react-icons/bs";
import { AuthContext } from "../contexts/AuthContext";

const MainLayout = () => {
  const { isRoot, logout, name } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column">
      <Flex
        as="header"
        direction="row"
        width="100%"
        justify="space-between"
        padding="1rem"
        whiteSpace="nowrap"
        alignItems="center"
        bgGradient="linear(200deg, rgba(36,195,173,1) 0%, rgba(39,167,138,1) 14%, rgba(29,125,85,1) 35%, rgba(19,85,57,1) 67%, rgba(10,46,30,1) 100%);"
      >
        <Heading size="2xl" textAlign="center">
          <Link to="/">
            <Image
              src={transparent_logo}
              alt="Flytrap Logo"
              height="auto"
              maxWidth="100%"
              maxHeight="100px"
            />
          </Link>
        </Heading>
        <Flex justifyContent="flex-end" alignItems="center" marginTop="1rem">
          <Link to="/projects">
            <Button
              colorScheme="gray"
              leftIcon={<BsFolder />}
              mx="10px"
              size={["sm", "md"]}
              px={["4", "6"]}
              py={["2", "4"]}
              fontWeight="light"
            >
              Projects
            </Button>
          </Link>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="gray"
              leftIcon={<BsPerson />}
              rightIcon={<ChevronDownIcon />}
              mx="10px"
              size={["sm", "md"]}
              px={["4", "6"]}
              py={["2", "4"]}
              fontWeight="light"
            >
              Account
            </MenuButton>
            <MenuList
              backgroundColor="white"
              boxShadow="lg"
              borderRadius="8px"
              padding="1rem"
              width="300px"
              marginTop="10px"
            >
              <MenuItem isDisabled>
                <Box
                  width="8px"
                  height="8px"
                  borderRadius="full"
                  backgroundColor="green.500"
                  mr="8px"
                />
                <Text fontSize="sm">Signed in as {name?.substring(0, 40)}</Text>
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
              {isRoot && (
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
              )}
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Box
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
