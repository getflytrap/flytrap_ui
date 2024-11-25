import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Button,
  Code,
  Divider,
  Container,
} from "@chakra-ui/react";
import CodeDisplay from "./CodeDisplay";
import { useProjects } from "../../hooks/useProjects";

/**
 * A component for setting up the Flytrap Flask SDK. 
 * It provides users with installation and setup instructions, 
 * dynamically inserting their project details such as API Key and Project UUID.
 *
 * @param apiKey - The API Key for the current project.
 * @returns A styled page with setup instructions for the Flask SDK.
 */
const FlaskSetup: React.FC<{ apiKey: string }> = ({ apiKey }) => {
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
            Configure Flask SDK
          </Heading>

          <Divider my={4} />

          <Text fontSize="lg" mb={4}>
            <strong>Installation</strong>
          </Text>
          <Text mb={2}>
            Run this command in your project directory or virtual environment:
          </Text>
          <CodeDisplay language="bash" code={`pip install flytrap_flask`} />

          <Divider my={4} />

          <Text fontSize="lg" mb={4}>
            <br />
            <strong>Usage</strong>
          </Text>

          <Text mb={4}>
            <strong>Import and Initialize the Flytrap SDK</strong>
          </Text>

          <Text mb={4}>In your project's main app file, import flytrap:</Text>
          <CodeDisplay language="python" code={`import flytrap`} />

          <Divider my={4} />
          <Text mb={2}>
            Initialize the flytrap module at the top of the main app file, with
            your Project ID, API Key, and Endpoint.
          </Text>
          <CodeDisplay
            language="python"
            code={`flytrap.init({
  api_endpoint: "${import.meta.env.VITE_FLYTRAP_SDK_URL}",
  api_key: "${currentApiKey}",
  project_id: "${project_uuid}"
})`}
          />

          <Divider my={4} />

          <Text mb={2}>
            Call the <Code>flytrap.setup_flask_error_handler</Code> method and
            pass it your Flask app instance to capture unhandled errors in your
            routes automatically.
          </Text>
          <CodeDisplay
            language="python"
            code={`flytrap.setup_flask_error_handler(app)`}
          />
          <Text mt={4} fontSize="md">
            Now, all unhandled exceptions that occur while your app is running
            will automatically be sent to your Flytrap AWS architecture!
          </Text>

          <Divider my={4} />

          <Text mb={2}>
            For capturing specific exceptions in your code, you can use the{" "}
            <Code>
              <strong>capture_exception</strong>
            </Code>{" "}
            method provided by Flytrap:
          </Text>
          <CodeDisplay
            language="python"
            code={`try:
  # Some code that might raise an exception
except Exception as e:
    flytrap.capture_exception(e)`}
          />
          <Text mb={4}>
            This method allows you to manually send errors to Flytrap, such as
            in <Code>try/except</Code> blocks.
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
            Take me to issues
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FlaskSetup;
