import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import transparent_logo from "../assets/transparent_logo.png";

const NotFound = () => {
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
      </Flex>
      <Box textAlign="center" py={20} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={"gray.500"} mb={6}>
          The page you're looking for does not seem to exist.
        </Text>
      </Box>
    </Box>
  );
};

export default NotFound;
