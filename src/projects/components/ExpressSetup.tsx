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
import CodeDisplay from "./CodeDisplay"; // Make sure to import CodeDisplay

const ExpressSetup: React.FC = () => {
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
          Express SDK Setup Instructions
        </Heading>

        <Divider my={4} />

        <Text fontSize="lg" mb={4}>
          <strong>Installation</strong>
        </Text>
        <Text mb={4}>
          In your project directory, install the Flytrap SDK via npm:
        </Text>
        <CodeDisplay language="bash" code="npm install flytrap_express" />

        <Divider my={4} />

        <Text fontSize="lg" mb={4}>
          <br />
          <strong>Usage</strong>
        </Text>

        <Text mb={4}>
          <strong>Import and Initialize the Flytrap SDK</strong>
        </Text>
        <Text mb={4}>
          In your main application file (e.g., `app.js` or `index.js`), import
          the Flytrap SDK and initialize it with your Project ID, API Key, and
          Endpoint.
        </Text>
        <CodeDisplay
          language="javascript"
          code={`import Flytrap from 'flytrap_express';

// Initialize Flytrap with your project credentials
const flytrap = new Flytrap({  
  projectId: 'YOUR_PROJECT_ID',  
  apiEndpoint: 'YOUR_ENDPOINT',  
  apiKey: 'YOUR_API_KEY',
});`}
        />

        <Divider my={4} />
        <br />

        <Text mb={4}>
          <strong>Set Up Express Middleware</strong>
        </Text>
        <Text mb={4}>
          Use the Flytrap middleware in your Express app to capture unhandled
          errors automatically:
        </Text>
        <CodeDisplay
          language="javascript"
          code={`import express from 'express';
const app = express();

// Set up the Flytrap error handling middleware
flytrap.setUpExpressErrorHandler(app);`}
        />
        <Text mb={4}>
          This middleware will intercept any unhandled errors in your Express
          routes and log them to Flytrap.
        </Text>

        <Divider my={4} />
        <br />

        <Text mb={4}>
          <strong>
            Optional: Disabling Automatic Promise Rejection Wrapping
          </strong>
        </Text>
        <Text mb={4}>
          By default, the Flytrap middleware will automatically wrap your
          asynchronous route handlers, ensuring that any unhandled promise
          rejections are captured and logged. However, if you prefer not to have
          your promise rejections automatically passed to the Express
          middleware, you can disable this behavior by passing{" "}
          <strong>false</strong> as an option:
        </Text>
        <CodeDisplay
          language="javascript"
          code={`flytrap.setUpExpressErrorHandler(app, false);`}
        />

        <Divider my={4} />
        <br />

        <Text mb={4}>
          <strong>Manually Capture Exceptions</strong>
        </Text>
        <Text mb={4}>
          For capturing specific exceptions in your code, you can use the{" "}
          <strong>captureException</strong> method provided by Flytrap:
        </Text>
        <CodeDisplay
          language="javascript"
          code={`try {  
  // Your code here
} catch (error) {  
  flytrap.captureException(error);
}`}
        />
        <Text mb={4}>
          This method allows you to manually send errors to Flytrap, even if
          they’re caught outside of the Express middleware.
        </Text>

        <Divider my={4} />

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

export default ExpressSetup;
