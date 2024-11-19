import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Code,
  Divider,
  Container,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import CodeDisplay from "./CodeDisplay";
import { useProjects } from "../../hooks/useProjects";

const FlaskSetup: React.FC<{apiKey: string}> = ({ apiKey }) => {
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

          <Box textAlign="left" w="full">
            <Text fontSize="lg" mb={2}>
              Run this command in your project directory or virtual environment:
            </Text>
            <CodeDisplay language="bash" code={`pip install flytrap_flask`} />
          </Box>

          <Divider />
          <br />

          <Box textAlign="left" w="full">
            <Text fontSize="lg" mb={2}>
              In your project's main app file, import flytrap:
            </Text>
            <CodeDisplay
              language="python"
              code={`import flytrap`}
            />
          </Box>

          <Divider />
          <br />

          <Box textAlign="left" w="full">
            <Text fontSize="lg" mb={2}>
              Instantiate the Flytrap class at the top of the main app file,
              passing in the config object containing api_endpoint, api_key, and
              project_id, which is provided in the project dashboard:
            </Text>
            <CodeDisplay
              language="python"
              code={`flytrap.init({
    api_endpoint: ${import.meta.env.VITE_FLYTRAP_SDK_URL},
    api_key: ${currentApiKey},
    project_id: ${project_uuid}'
  })`}
            />
          </Box>

          <Divider />
          <br />

          <Box textAlign="left" w="full">
            <Text fontSize="lg" mb={2}>
              Call the <Code>setup_flask_error_handler</Code> instance method,
              e.g. assuming you named your Flytrap instance as{" "}
              <Code>flytrap</Code>:
            </Text>
            <CodeDisplay
              language="python"
              code={`flytrap.setup_flask_error_handler(app)`}
            />
            <Text mt={4} fontSize="md">
              Now, all unhandled exceptions that occur while your app is running
              will automatically be sent to your Flytrap AWS architecture!
            </Text>
          </Box>

          <Divider />
          <br />

          <Box textAlign="left" w="full">
            <Text fontSize="lg" mb={2}>
              To capture handled exceptions too, follow this pattern in each of
              your <Code>except</Code> blocks:
            </Text>
            <CodeDisplay
              language="python"
              code={`try:
    # Some code that might raise an exception
except Exception as e:
      flytrap.capture_exception(e)`}
            />
          </Box>

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
