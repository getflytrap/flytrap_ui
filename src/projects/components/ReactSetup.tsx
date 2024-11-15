import React from "react";
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

const ReactSetup: React.FC = () => {
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
          React SDK Instructions
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
          In the file where your top-level component is rendered (usually named
          `main.tsx` or `index.jsx`), add the following code snippet:
        </Text>

        <CodeDisplay
          language="typescript"
          code={`import Flytrap from "flytrap_react";

const flytrap = new Flytrap({
  projectId: 'your-project-id',
  apiEndpoint: 'https://your-api-endpoint.com',
  apiKey: 'your-api-key',
});
`}
        />

        <Text fontSize="lg" mb={4} mt={6}>
          In the same file (main.tsx or index.js), wrap your top-level component{" "}
          {`<App />`} in the {`<ErrorBoundary>`} tags:
        </Text>

        <CodeDisplay
          language="tsx"
          code={`createRoot(document.getElementById("root")!).render(
  <Flytrap.ErrorBoundary flytrap={flytrap}>
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

export default ReactSetup;
