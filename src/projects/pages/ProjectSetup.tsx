import React from "react";
import { useLocation } from "react-router-dom";
import { Heading, Text, VStack } from "@chakra-ui/react";
import ReactSetup from "../components/ReactSetup";
import JavaScriptSetup from "../components/JavaScriptSetup";
import FlaskSetup from "../components/FlaskSetup";
import ExpressSetup from "../components/ExpressSetup";

const ProjectSetup: React.FC = () => {
  const location = useLocation();
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
    case "Express.js":
      platformComponent = <ExpressSetup />;
      break;
    default:
      platformComponent = <Text>No platform selected</Text>;
  }

  return platformComponent;
};

export default ProjectSetup;
