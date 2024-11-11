import React from 'react';
import { ChakraProvider, Box, Heading, Text, Button, Code, Divider, Container, Card, CardBody } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';

const FlaskSetup: React.FC = () => {
    const { project_uuid } = useParams();
    const navigate = useNavigate();
  
    const handleButtonClick = () => {
      if (project_uuid) {
        navigate(`/projects/${project_uuid}/errors`);
      }
    };
  
    return (
        <Container maxW="container.lg" py={10} px={6}>
          <Box textAlign="left" bg="gray.50" borderRadius="md" p={6} boxShadow="xl">
            <Heading as="h1" size="xl" mb={6} color="teal.600">
              Flask SDK
            </Heading>
  
            <Divider mb={6} borderColor="gray.300" />
  
            <Heading as="h2" size="lg" mb={3} color="teal.500">
              Install
            </Heading>
            <Divider mb={6} borderColor="gray.300" />
            <Text mb={4} fontSize="lg" color="gray.700">
              Add the SDK using npm:
            </Text>
            <Box mb={8}>
              <Code
                display="block"
                p={4}
                bg="black"
                color="white"
                fontSize="lg"
                borderRadius="md"
                boxShadow="lg"
              >
                npm install sdk-package-name
              </Code>
            </Box>
  
            <Heading as="h2" size="lg" mb={3} color="teal.500">
              Configure SDK
            </Heading>
            <Divider mb={6} borderColor="gray.300" />
            <Text mb={4} fontSize="lg" color="gray.700">
              Add this code to FILL-IN-LATER file over your project:
            </Text>
            <Box mb={8}>
              <Code
                display="block"
                p={4}
                bg="black"
                color="white"
                fontSize="lg"
                borderRadius="md"
                boxShadow="lg"
              >
                {`import { initializeSDK } from "sdk-package-name";
  
  initializeSDK({
    apiKey: "YOUR_API_KEY",
    options: {
      tracing: true,
      errorTracking: true,
    },
  });
  
  const container = document.getElementById("app");
  const root = createRoot(container);
  root.render(<App />);
  `}
              </Code>
            </Box>
  
            <Heading as="h2" size="lg" mb={3} color="teal.500">
              Verify
            </Heading>
            <Divider mb={6} borderColor="gray.300" />
            <Text mb={4} fontSize="lg" color="gray.700">
              This snippet contains an intentional error and can be used as a test to make sure that everything's working as expected.
            </Text>
            <Box mb={8}>
              <Code
                display="block"
                p={4}
                bg="black"
                color="white"
                fontSize="lg"
                borderRadius="md"
                boxShadow="lg"
              >
                {`return <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>;`}
              </Code>
            </Box>
  
            <Button
              colorScheme="teal"
              size="lg"
              width="100%"
              onClick={handleButtonClick}
              borderRadius="md"
              boxShadow="lg"
              _hover={{ bg: "teal.700" }}
            >
              Take me to Dashboard
            </Button>
          </Box>
        </Container>
    );
  };
  
export default FlaskSetup;
