import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Divider,
  Container,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import CodeDisplay from "./CodeDisplay";
import { useProjects } from "../../hooks/useProjects";

const ReactSetup: React.FC<{apiKey: string}> = ({ apiKey }) => {
  const { projects } = useProjects();
  const { project_uuid } = useParams();
  const navigate = useNavigate();
  const [currentApiKey, setCurrentApiKey] = useState<string | null>(null);

  useEffect(() => {
    if (apiKey) {
      setCurrentApiKey(apiKey);
    } else if (project_uuid) {
      const project = projects.find((p) => p.uuid === project_uuid);
      if (project) {
        setCurrentApiKey(project.api_key);
      }
    }
  }, [apiKey, project_uuid, projects]);

  const handleButtonClick = () => {
    if (project_uuid) {
      navigate(`/projects/${project_uuid}/issues`);
    }
  };

  return (
    <Box bg="gray.100" textAlign="left" px={6} overflowY="auto" width="100%">
      <Container maxW="1200px" mx="auto">
        <Box
          textAlign="left"
          bg="gray.50"
          borderRadius="md"
          p={6}
          boxShadow="xl"
        >
          <Heading as="h2" fontSize="1.5rem" mb={6}>
            Configure React SDK
          </Heading>
          <Divider />
          <br />

          <Text fontSize="lg" mb={4}>
            <b>Installation</b>
          </Text>
          <Text mb={4}>
            In your project directory, install the Flytrap SDK via npm:
          </Text>

          <CodeDisplay language="bash" code="npm install flytrap_react" />

          <Divider />
          <br />
          <Text fontSize="lg" mb={4}>
            <b>Usage</b>
          </Text>
          <Text fontSize="lg" mb={4} mt={6}>
            In the file where your top-level component is rendered (usually
            named `main.tsx` or `index.jsx`), add the following code snippet:
          </Text>

          <CodeDisplay
            language="typescript"
            code={`import flytrap from "flytrap_react";
  
  // Initialize Flytrap with your project credentials
  flytrap.init({
    projectId: ${project_uuid},
    apiEndpoint: ${import.meta.env.VITE_FLYTRAP_SDK_URL},
    apiKey: ${currentApiKey}
  });`}
          />

          <Text fontSize="lg" mb={4} mt={6}>
            In the same file (main.tsx or index.js), wrap your top-level
            component {`<App />`} in the {`<ErrorBoundary>`} tags:
          </Text>

          <CodeDisplay
            language="tsx"
            code={`createRoot(document.getElementById("root")!).render(
    <Flytrap.ErrorBoundary>
      <App />
    </Flytrap.ErrorBoundary>
  );
  `}
          />
          <Divider />
          <br />

          <Text fontSize="lg" mb={4} mt={6}>
            <b>Optional:</b> Insert these JSX tags into the return statement of
            any component to test:
          </Text>

          <Text mb={4}>
            <b>Throw a test error</b>
          </Text>

          <CodeDisplay
            language="tsx"
            code={`<button
     onClick={() => {
       let number = 42;
       number.toUpperCase();
   }}
   >
    Throw a test error
  </button>
  `}
          />

          <Text mb={4} mt={6}>
            <b>Throw an unhandled rejected promise</b>
          </Text>

          <CodeDisplay
            language="tsx"
            code={`<button
    onClick={() => {
      throw Promise.reject("for testing: unhandled rejected promise");
    }}
  >
    Throw an unhandled rejected promise
  </button>
  `}
          />

          <Divider my={6} />

          <Button
            colorScheme="teal"
            size="lg"
            width="30%"
            onClick={handleButtonClick}
            borderRadius="md"
            boxShadow="lg"
            _hover={{ bg: "teal.700" }}
            mt={8}
            mb={12}
          >
            Take me to Dashboard
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ReactSetup;
