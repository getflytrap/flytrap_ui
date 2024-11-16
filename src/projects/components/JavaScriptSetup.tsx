import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Code,
  Container,
  Divider,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import CodeDisplay from "./CodeDisplay";

const JavaScriptSetup: React.FC = () => {
  const { project_uuid } = useParams();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (project_uuid) {
      navigate(`/projects/${project_uuid}/issues`);
    }
  };

  return (
    <Box bg="gray.100" textAlign="left" px={6} overflowY="auto" width="100%">
      <Container maxWidth="1200px" mx="auto">
        <Box textAlign="left" bg="gray.50" borderRadius="md" p={6} boxShadow="xl" maxWidth="1200px">
          <Heading as="h1" fontSize="2rem" mb={6}>
            JavaScript SDK Setup Instructions
          </Heading>
  
          <Box textAlign="left" w="full">
            <Text fontSize="xl" mb={2} fontWeight="bold">
              Installation
            </Text>
            <Text fontSize="lg" mb={4}>
              To use Flytrap, simply include the SDK in your project.
            </Text>
            <Divider />
            <br />
  
            <Text fontSize="xl" mb={2} fontWeight="bold">
              Via Script Tag:
            </Text>
            <Text fontSize="md" mb={4}>
              The SDK is distributed in UMD format, allowing it to be imported
              directly in the browser with a <Code>&lt;script&gt;</Code> tag:
            </Text>
            <CodeDisplay
              language="html"
              code={`<script src="scripts/flytrap/index.js"></script>`}
            />
            <Divider />
            <br />
  
            <Text fontSize="xl" mt={4} fontWeight="bold">
              Development:
            </Text>
            <Text fontSize="lg" mt={4}>
              Run <Code>npm build</Code> to create the bundled version. Then, copy
              the bundled <Code>dist/index.debug.js</Code> and{" "}
              <Code>index.debug.js.map</Code> file into a{" "}
              <Code>scripts/flytrap</Code> directory.
            </Text>
          </Box>
  
          <Divider />
          <br />
  
          <Box textAlign="left" w="full">
            <Text fontSize="xl" mt={4} fontWeight="bold">
              Usage
            </Text>
            <br />
            <Text fontSize="lg" mb={4}>
              To begin using Flytrap, initialize it with your project
              configuration:
            </Text>
            <CodeDisplay
              language="javascript"
              code={`const flytrap = new Flytrap({
    projectId: ${project_uuid},
    apiEndpoint: ${import.meta.env.VITE_FLYTRAP_SDK_URL},
    apiKey: ${"WILL_BE_SENT_FROM_BACKEND"}
  });`}
            />
          </Box>
  
          <Divider />
          <br />
          <Box textAlign="left" w="full">
            <Text fontSize="xl" mt={4} fontWeight="bold">
              Capturing Errors
            </Text>
            <Text fontSize="lg" mb={4}>
              Flytrap automatically listens for uncaught exceptions and unhandled
              promise rejections. You can also manually capture errors by calling{" "}
              <Code>captureException</Code>:
            </Text>
            <CodeDisplay
              language="javascript"
              code={`try {
    throw new Error('An example error');
  } catch (error) {
    flytrap.captureException(error);
  }`}
            />
          </Box>
  
          <Box textAlign="center" w="full" mt={8}>
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
        </Box>
      </Container>
    </Box>
  );
};

export default JavaScriptSetup;
