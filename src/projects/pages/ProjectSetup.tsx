import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

interface LocationState {
  platform: "React" | "JavaScript" | "Flask" | "Express";
}

const ProjectSetup: React.FC = () => {
  const location = useLocation<LocationState>();
  const { platform } = location.state || {};

  let platformComponent: React.ReactNode;

  switch (platform) {
    case "React":
      platformComponent = <ReactSetup />;
      break;
    case "JavaScript":
      platformComponent = <JavaScriptSetup />;
      break;
    case "Flask":
      platformComponent = <FlaskSetup />;
      break;
    case "Express":
      platformComponent = <ExpressSetup />;
      break;
    default:
      platformComponent = <Text>No platform selected</Text>;
  }

  return (
    <VStack spacing={4} align="stretch" p={6}>
      <Heading as="h1" size="xl">Project Setup</Heading>
      {platformComponent}
    </VStack>
  );
};

export default ProjectSetup;
