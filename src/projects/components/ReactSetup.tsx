import React from 'react';
import { ChakraProvider, Box, Heading, Text, Button, Code, Divider, Container } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';

interface RouteParams {
  project_uuid: string;
}

const ReactSetup: React.FC = () => {
  const { project_uuid } = useParams<RouteParams>();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (project_uuid) {
      navigate(`/projects/${project_uuid}/errors`);
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="container.lg" py={8} px={4}>
        <Box textAlign="left">
          <Heading as="h1" size="xl" mb={4}>Configure React SDK</Heading>
          <Divider mb={6} />
          <Heading as="h2" size="lg" mb={2}>Install</Heading>
          <Text mb={4}>Add the SDK as a dependency using npm:</Text>
          <Box mb={8}>
            <Code display="block" p={4} bg="black" color="white" fontSize="lg">
              npm install sdk-package-name
            </Code>
          </Box>
          <Heading as="h2" size="lg" mb={2}>Configure SDK</Heading>
          <Text mb={4}>Add this code somewhere in your React application:</Text>
          <Box mb={8}>
            <Code display="block" p={4} bg="black" color="white" fontSize="lg">
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
          <Heading as="h2" size="lg" mb={2}>Verify</Heading>
          <Text mb={4}>This snippet contains an intentional error and can be used as a test to make sure that everything's working as expected.</Text>
          <Box mb={8}>
            <Code display="block" p={4} bg="black" color="white" fontSize="lg">
              {`return <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>;`}
            </Code>
          </Box>
          <Button
            colorScheme="teal"
            size="lg"
            width="100%"
            onClick={handleButtonClick}
          >
            Take me to Dashboard
          </Button>
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default ReactSetup;
