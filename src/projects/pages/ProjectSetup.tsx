import { useLocation } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import ReactSetup from "../components/ReactSetup";
import JavaScriptSetup from "../components/JavaScriptSetup";
import FlaskSetup from "../components/FlaskSetup";
import ExpressSetup from "../components/ExpressSetup";

/**
 * ProjectSetup component dynamically renders the setup instructions
 * based on the selected platform.
 */
const ProjectSetup = () => {
  const location = useLocation();

  // Extract platform and apiKey from location state
  const { platform, apiKey } = location.state || {};

  // Determine which component to render based on the platform
  let platformComponent: React.ReactNode;
  switch (platform) {
    case "React":
      platformComponent = <ReactSetup apiKey={apiKey} />;
      break;
    case "JavaScript":
      platformComponent = <JavaScriptSetup apiKey={apiKey} />;
      break;
    case "Flask":
      platformComponent = <FlaskSetup apiKey={apiKey} />;
      break;
    case "Express.js":
      platformComponent = <ExpressSetup apiKey={apiKey} />;
      break;
    default:
      platformComponent = <Text>No platform selected</Text>;
  }

  return platformComponent;
};

export default ProjectSetup;
