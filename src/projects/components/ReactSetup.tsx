import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Button,
  Divider,
  Container,
  Code,
} from "@chakra-ui/react";
import CodeDisplay from "./CodeDisplay";
import { useProjects } from "../../hooks/useProjects";

/**
 * A component for setting up the Flytrap React SDK. 
 * It provides users with installation and setup instructions, 
 * dynamically inserting their project details such as API Key and Project UUID.
 *
 * @param apiKey - The API Key for the current project.
 * @returns A styled page with setup instructions for the React SDK.
 */
const ReactSetup: React.FC<{ apiKey: string }> = ({ apiKey }) => {
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

          <Text fontSize="lg" mb={4}>
            <b>Installation</b>
          </Text>
          <Text mb={4}>
            In your project directory, install the Flytrap SDK via npm:
          </Text>

          <CodeDisplay language="bash" code="npm install flytrap_react" />

          <Divider my={4} />
          <Text fontSize="lg" mb={4}>
            <strong>Usage</strong>
          </Text>
          <Text mb={4}>
            In the file where your top-level component is rendered (usually
            named <Code>main.tsx</Code> or <Code>index.jsx</Code>), import the
            Flytrap module and initialize it with your project credentials:
          </Text>

          <CodeDisplay
            language="javascript"
            code={`import flytrap from "flytrap_react";
  
  // Initialize Flytrap with your project credentials
  flytrap.init({
    projectId: "${project_uuid}",
    apiEndpoint: "${import.meta.env.VITE_FLYTRAP_SDK_URL}",
    apiKey: "${currentApiKey}"
  });`}
          />
          <Text>
            The Flytrap SDK automatically sets up global error and unhandled
            promise rejection handlers. These handlers ensure any uncaught
            exceptions or rejections are captured and logged.
          </Text>
          <br></br>
          <Text>
            By default, Flytrap will attempt to capture snippets of your source
            code around the location of errors (e.g., the file, line number, and
            surrounding lines). This feature can provide more meaningful
            debugging information but may require source files to be available
            at runtime. If you don't want flytrap to do this, you can pass an
            additional property to the Flytrap configuration,{" "}
            <Code>includeContext: false</Code>.
          </Text>
          <CodeDisplay
            language="javascript"
            code={` flytrap.init({
    projectId: "${project_uuid}",
    apiEndpoint: "${import.meta.env.VITE_FLYTRAP_SDK_URL}",
    apiKey: "${currentApiKey}",
    includeContext: false
  });`}
          />

          <Divider my={4} />

          <Text mb={4}>
            <strong>Set Up the Flytrap Error Boundary</strong>
          </Text>
          <Text mb={4}>
            In the same file, wrap your top-level component{" "}
            <Code>{`<App />`}</Code> in the <Code>{`<ErrorBoundary>`}</Code>{" "}
            tags:
          </Text>

          <CodeDisplay
            language="tsx"
            code={`createRoot(document.getElementById("root")!).render(
    <flytrap.ErrorBoundary fallback={<div>Something went wrong!</div>}>
      <App />
    </flytrap.ErrorBoundary>
  );
  `}
          />
          <Divider my={4} />

          <Text>
            You can also manually capture errors by calling{" "}
            <Code>captureException</Code>:
          </Text>
          <CodeDisplay
            language="javascript"
            code={`try {
  throw new Error('An example error');
} catch (error) {
    flytrap.captureException(error, {
    method: "GET", // Optional: HTTP method, if applicable
    url: "https://example.com/api", // Optional: URL, if applicable
  });
}`}
          />
          <Text mb={4}>
            This method allows you to provide additional metadata about the
            error, such as the HTTP method and URL, for better debugging. When
            using axios, this metadata will automatically be captured. You don't
            need to pass it in explicitly.
          </Text>

          <Divider my={4} />

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
