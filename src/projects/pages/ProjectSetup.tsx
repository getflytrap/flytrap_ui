import React from "react";
import { useLocation } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import ReactSetup from "../components/ReactSetup";
import JavaScriptSetup from "../components/JavaScriptSetup";
import FlaskSetup from "../components/FlaskSetup";
import ExpressSetup from "../components/ExpressSetup";

const ProjectSetup: React.FC = () => {
  const location = useLocation();
  const { platform, apiKey } = location.state || {};

  let platformComponent: React.ReactNode;

  switch (platform) {
    case "React":
      platformComponent = <ReactSetup apiKey={apiKey}/>;
      break;
    case "JavaScript":
      platformComponent = <JavaScriptSetup apiKey={apiKey}/>;
      break;
    case "Flask":
      platformComponent = <FlaskSetup apiKey={apiKey}/>;
      break;
    case "Express.js":
      platformComponent = <ExpressSetup apiKey={apiKey}/>;
      break;
    default:
      platformComponent = <Text>No platform selected</Text>;
  }

  return platformComponent;
};

export default ProjectSetup;
