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
// import transparent_logo from "../../assets/transparent_logo.png";
import transparent_logo_animated from "../../assets/transparent_logo_animated.png";
import { AuthContext } from "../../contexts/AuthContext";

const LandingPage = () => {
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
    <Box
      bgGradient="linear(200deg, rgba(36,195,173,1) 0%, rgba(39,167,138,1) 14%, rgba(29,125,85,1) 35%, rgba(19,85,57,1) 67%, rgba(10,46,30,1) 100%);"
      minH="100vh"
      minW="100vw"
      color="white"
    >
      <Container maxWidth="1280px" centerContent>
        <Flex justify="center" my={12}>
          {/* <Image src={transparent_logo} alt="FlyTrap Logo" maxW="400px" /> */}
          <Image
            src={transparent_logo_animated}
            alt="FlyTrap Logo"
            maxW="500px"
          />
        </Flex>
        {/* <Text
          fontSize="lg"
          variant="light"
          textAlign="center"
          maxW="lg"
          mt={8}
        >
          Flytrap is the ultimate error monitoring solution for developers,
          offering real-time detection and detailed insights into your code's
          issues—so you can fix bugs faster and improve your user experience.
          Flytrap is lightweight, easy to set up, and focused solely on what
          matters most: identifying and resolving errors before they disrupt
          your application.
        </Text> */}
        <Text
          fontSize="2rem"
          fontWeight="bold"
          color="rgba(233, 246, 216, 0.7)"
          // my={2}
        >
          Catching Bugs So You Don't Have To
        </Text>
        <Text
          fontSize="1.2rem"
          color="rgba(233, 246, 216, 0.7)"
          my={2}
          fontWeight="300"
        >
          Lightweight Error Monitoring You Own, Trust, and Control.
        </Text>
        <Flex justify="center" mt={12}>
          {isLoggedIn ? (
            <Link to="/projects">
              <Button
                bg="rgba(233, 246, 216, 0.7)"
                color="brand.800"
                px={8}
                py={6}
                my={12}
                _hover={{
                  bg: "#83A05E",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button
                bg="rgba(233, 246, 216, 0.7)"
                color="brand.800"
                px={8}
                py={6}
                my={12}
                _hover={{
                  bg: "#83A05E",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                Login
              </Button>
            </Link>
          )}
        </Flex>

        <VStack spacing={6} my={8}>
          {/* <Text fontSize="lg" variant="light">
            Developed By
          </Text> */}
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
                <Text
                  variant="light"
                  noOfLines={1}
                  isTruncated
                  color="rgba(255, 255, 255, 0.7)"
                >
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
