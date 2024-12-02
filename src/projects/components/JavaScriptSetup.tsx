import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Button,
  Code,
  Container,
  Divider,
} from "@chakra-ui/react";
import CodeDisplay from "./CodeDisplay";
import { useProjects } from "../../hooks/useProjects";

/**
 * A component for setting up the Flytrap JavaScript SDK.
 * It provides users with installation and setup instructions,
 * dynamically inserting their project details such as API Key and Project UUID.
 *
 * @param apiKey - The API Key for the current project.
 * @returns A styled page with setup instructions for the JavaScript SDK.
 */
const JavaScriptSetup: React.FC<{ apiKey: string }> = ({ apiKey }) => {
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
      <Container maxWidth="1200px" mx="auto">
        <Box
          textAlign="left"
          bg="gray.50"
          borderRadius="md"
          p={6}
          boxShadow="xl"
          maxWidth="1200px"
        >
          <Heading as="h2" fontSize="1.5rem" mb={6}>
            Configure JavaScript SDK
          </Heading>

          <Divider my={4} />

          <Text fontSize="lg" mb={2} fontWeight="bold">
            Installation
          </Text>
          <Text mb={4}>
            The Flytrap JavaScript SDK is designed to work with vanillaJS
            applications. To use Flytrap, simply include the SDK via a{" "}
            <Code>{"<script>"}</Code> tag in your HTML file.
          </Text>
          <CodeDisplay
            language="html"
            code={
              "<script src='https://cdn.jsdelivr.net/npm/flytrap_javascript/dist/index.js'></script>"
            }
          />

          <Divider my={4} />

          <Text fontSize="lg" mb={2} fontWeight="bold">
            Usage
          </Text>
          <Text mb={4}>
            Initialize Flytrap in your script by providing your Project ID, API
            Key, and Endpoint:
          </Text>
          <CodeDisplay
            language="javascript"
            code={`flytrap.init({
  projectId: "${project_uuid}",
  apiEndpoint: "${import.meta.env.VITE_FLYTRAP_SDK_URL}",
  apiKey: "${currentApiKey}"
});`}
          />
          <Text mb={4}>
            Flytrap automatically captures uncaught exceptions and unhandled
            promise rejections.
          </Text>
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
            code={`flytrap.init({
  projectId: "${project_uuid}",
  apiEndpoint: "${import.meta.env.VITE_FLYTRAP_SDK_URL}",
  apiKey: "${currentApiKey}",
  includeContext: false
});`}
          />

          <Divider my={4} />

          <Text fontSize="lg" mb={2} fontWeight="bold">
            Capturing Errors
          </Text>
          <Text mb={4}>
            Flytrap automatically listens for uncaught exceptions and unhandled
            promise rejections. You can also manually capture errors by calling{" "}
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

export default JavaScriptSetup;
