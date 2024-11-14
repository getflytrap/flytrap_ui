import React from "react";
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

const FlaskSetup: React.FC = () => {
  const { project_uuid } = useParams();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (project_uuid) {
      navigate(`/projects/${project_uuid}/issues`);
    }
  };

  return (
    <Container maxW="container.lg" py={10} px={6}>
      <Box textAlign="left" bg="gray.50" borderRadius="md" p={6} boxShadow="xl">
        <Heading as="h1" size="xl" mb={6} color="teal.600">
          Flask SDK Setup Instructions
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
          <CodeDisplay language="python" code={`from flytrap import Flytrap`} />
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
            code={`error_monitor = Flytrap({
  api_endpoint: 'YOUR_API_ENDPOINT',
  api_key: 'YOUR_API_KEY',
  project_id: 'YOUR_PROJECT_ID'
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
            code={`flytrap.setup_flask_error_handler()`}
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
  );
};

export default FlaskSetup;
