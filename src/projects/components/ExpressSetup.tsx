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
 * A component for setting up the Flytrap Express SDK.
 * It provides users with installation and setup instructions,
 * dynamically inserting their project details such as API Key and Project UUID.
 *
 * @param apiKey - The API Key for the current project.
 * @returns A styled page with setup instructions for the Express SDK.
 */
const ExpressSetup: React.FC<{ apiKey: string }> = ({ apiKey }) => {
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
            Configure Express SDK
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
            <strong>Usage</strong>
          </Text>

          <Text mb={4}>
            <strong>Import and Initialize the Flytrap SDK</strong>
          </Text>
          <Text mb={4}>
            In your main application file (e.g., <Code>app.js</Code> or{" "}
            <Code>index.js</Code>), import the Flytrap module and initialize it
            with your Project ID, API Key, and Endpoint.
          </Text>
          <CodeDisplay
            language="javascript"
            code={`// CommonJS
  const flytrap = require("flytrap_express");

  // ES6 Modules
  import flytrap from 'flytrap_express';
  
  // Initialize Flytrap with your project credentials
  flytrap.init({
    projectId: "${project_uuid}",
    apiEndpoint: "${import.meta.env.VITE_FLYTRAP_SDK_URL}",
    apiKey: "${currentApiKey}"
  });`}
          />
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
            <strong>Set Up Express Middleware</strong>
          </Text>
          <Text mb={4}>
            Use the Flytrap middleware in your Express app to capture unhandled
            errors and Promise rejections in your routes automatically.
          </Text>
          <CodeDisplay
            language="javascript"
            code={`import express from 'express';
  const app = express();
  
  // Set up the Flytrap error handling middleware:
  // Add this after all routes,
  // but before any and other error-handling middlewares are defined
  flytrap.setUpExpressErrorHandler(app);`}
          />

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
            rejections are captured and logged. However, if you prefer not to
            have your promise rejections automatically passed to the Express
            middleware, you can disable this behavior by passing{" "}
            <Code>{"{ wrapAsync = false }"}</Code> as an option:
          </Text>
          <CodeDisplay
            language="javascript"
            code={`flytrap.setUpExpressErrorHandler(app, { wrapAsync: false });`}
          />
          <Text>
            About <Code>wrapAsync</Code>: When <Code>wrapAsync</Code> is set to{" "}
            <Code>true </Code>(default), Flytrap will wrap asynchronous route
            handlers to ensure that unhandled promise rejections are properly
            captured. If you disable this feature{" "}
            <Code>{"{ wrapAsync = false }"}</Code>, you'll need to handle
            promise rejections manually by ensuring all async route handlers are
            properly wrapped with <Code>try/catch</Code> or{" "}
            <Code>.catch()</Code> logic.
          </Text>

          <Divider my={4} />
          <br />

          <Text mb={4}>
            <strong>Manually Capture Exceptions</strong>
          </Text>
          <Text mb={4}>
            For capturing specific exceptions in your code, you can use the{" "}
            <Code>
              <strong>captureException</strong>
            </Code>{" "}
            method provided by Flytrap:
          </Text>
          <CodeDisplay
            language="javascript"
            code={`try {  
  // Your code here
} catch (error) {  
  flytrap.captureException(error, req); // Optionally pass the 'req' object for 
                                        // additional context
}`}
          />
          <Text mb={4}>
            This method allows you to manually send errors to Flytrap, even if
            they're caught outside of the Express middleware.
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
            Take me to Issues
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ExpressSetup;
