import React, { useState, useEffect } from "react";
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
import { useProjects } from "../../hooks/useProjects";

const JavaScriptSetup: React.FC<{apiKey: string}> = ({ apiKey }) => {
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

          <Box textAlign="left" w="full">
            <Text fontSize="lg" mb={2} fontWeight="bold">
              Installation
            </Text>
            <Text mb={4}>
              To use Flytrap, simply include the SDK in your project.
            </Text>
            <Text mb={4}>
              The SDK is distributed in UMD format, allowing it to be imported
              directly in the browser with a <Code>&lt;script&gt;</Code> tag:
            </Text>
            <CodeDisplay
              language="html"
              code={`<script src="scripts/flytrap/index.js"></script>`}
            />
          </Box>

          <Divider />
          <br />

          <Box textAlign="left" w="full">
            <Text fontSize="lg" mt={4} fontWeight="bold">
              Usage
            </Text>
            <br />
            <Text mb={4}>
              To begin using Flytrap, initialize it with your project
              configuration:
            </Text>
            <CodeDisplay
              language="javascript"
              code={`flytrap.init({
    projectId: ${project_uuid},
    apiEndpoint: ${import.meta.env.VITE_FLYTRAP_SDK_URL},
    apiKey: ${currentApiKey}
  });`}
            />
          </Box>

          <Divider />
          <br />
          <Box textAlign="left" w="full">
            <Text fontSize="lg" mt={4} fontWeight="bold">
              Capturing Errors
            </Text>
            <Text mb={4}>
              Flytrap automatically listens for uncaught exceptions and
              unhandled promise rejections. You can also manually capture errors
              by calling <Code>captureException</Code>:
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
