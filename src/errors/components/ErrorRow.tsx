import { Box, Td, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ErrorData } from "../../types";
import { Project } from "../../types";

interface ErrorRowProps {
  error: ErrorData;
  selectedProject: Project | null;
  selectedHandled: string;
  selectedTime: string;
}

const ErrorRow = ({
  error,
  selectedProject,
  selectedHandled,
  selectedTime,
}: ErrorRowProps) => {
  return (
    <Box as="tr" key={error.uuid} mb={2}>
      <Td>
        <Link
          as={RouterLink}
          to={`/projects/${selectedProject?.uuid}/errors/${error.uuid}`}
          _hover={{ color: "blue.500", cursor: "pointer" }}
          state={{ time: selectedTime, handled: selectedHandled }}
        >
          {error.name || "Un-named Error"}
        </Link>
      </Td>
      {/* <Td>{error.type}</Td> */}
      <Td>
        <Box
          as="span"
          borderRadius="20px"
          bg={error.handled ? "green.50" : "red.50"}
          border={`1px solid ${error.handled ? "green.800" : "red.800"}`}
          color={error.handled ? "green.800" : "red.800"}
          px={2}
          py={1}
          display="inline-block"
        >
          {error.handled ? "Handled" : "Unhandled"}
        </Box>
      </Td>
      <Td>{new Date(error.created_at).toLocaleString()}</Td>
      <Td>{error.resolved ? "Resolved" : "Unresolved"}</Td>
    </Box>
  );
};

export default ErrorRow;
