import { useContext } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  Image,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import flytrap_logo from "../../assets/flytrap_logo.png";
import { AuthContext } from "../../contexts/AuthContext";

const LandingPage = ({ bgColor = "brand.500" }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const developers = [
    {
      name: "Rebecca Biancofiore",
      avatarUrl: "https://avatars.githubusercontent.com/u/58274427?v=4",
    },
    {
      name: "Anthony Kovatch",
      avatarUrl: "https://avatars.githubusercontent.com/u/96496455?v=4",
    },
    {
      name: "Clarissa Roeder",
      avatarUrl: "https://avatars.githubusercontent.com/u/123587588?v=4",
    },
    {
      name: "Saul Thompson",
      avatarUrl: "https://avatars.githubusercontent.com/u/118783042?v=4",
    },
  ];

  return (
    <Box bg={bgColor} minH="100vh" minW="100vw" color="white" py={12}>
      <Container maxWidth="1280px" centerContent>
        <Flex justify="center" mb={8}>
          <Image src={flytrap_logo} alt="FlyTrap Logo" maxW="400px" />
        </Flex>
        <Text fontSize="lg" textAlign="center" maxW="lg" mb={8}>
          Flytrap is the ultimate error monitoring solution for developers,
          offering real-time detection and detailed insights into your code’s
          issues—so you can fix bugs faster and improve your user experience.
          Flytrap is lightweight, easy to set up, and focused solely on what
          matters most: identifying and resolving errors before they disrupt
          your application.
        </Text>
        <Flex justify="center">
          {isLoggedIn ? (
            <Link to="/projects">
              <Button
                size="2xl"
                bg="brand.400"
                px={8}
                py={6}
                mt="50px"
                mb="70px"
                borderRadius="full"
              >
                Go to Projects
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button
                size="2xl"
                bg="brand.400"
                px={8}
                py={6}
                mt="50px"
                mb="70px"
                borderRadius="full"
              >
                Login
              </Button>
            </Link>
          )}
        </Flex>

        <VStack spacing={6} mb={12}>
          <Text fontSize="lg" fontWeight="bold">
            Developed By:
          </Text>
          <Flex
            justify="space-between"
            width="100%"
            mx="5px"
            wrap="wrap"
            gap={4}
          >
            {developers.map((developer, index) => (
              <Box
                key={index}
                textAlign="center"
                flex="1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                mx="10px"
                width={["auto", "auto", "20%"]}
              >
                <Image
                  src={developer.avatarUrl}
                  alt={developer.name}
                  borderRadius="full"
                  boxSize={["60px", "80px", "100px"]}
                  mb={2}
                />
                <Text noOfLines={1} isTruncated>
                  {developer.name}
                </Text>
              </Box>
            ))}
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default LandingPage;
