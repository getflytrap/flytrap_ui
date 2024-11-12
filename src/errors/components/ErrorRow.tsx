import { Box, Td, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ErrorData, Rejection } from "../../types";
import { Project } from "../../types";

interface ErrorRowProps {
  issue: ErrorData | Rejection;
  selectedProject: Project | null;
  selectedHandled: string;
  selectedTime: string;
}

const ErrorRow = ({
  issue,
  selectedProject,
  selectedHandled,
  selectedTime,
}: ErrorRowProps) => {
  const isErrorData = (issue: ErrorData | Rejection): issue is ErrorData => {
    return "name" in issue;
  };

  return (
    <Box as="tr" key={issue.uuid} mb={2}>
      <Td>
        <Link
          as={RouterLink}
          to={`/projects/${selectedProject?.uuid}/errors/${issue.uuid}`}
          _hover={{ color: "blue.500", cursor: "pointer" }}
          state={{ time: selectedTime, handled: selectedHandled }}
        >
          {isErrorData(issue) ? issue.name || "Un-named Error" : issue.value}
        </Link>
      </Td>
      {/* <Td>{issue.type}</Td> */}
      <Td>
        <Box
          as="span"
          borderRadius="20px"
          bg={issue.handled ? "green.50" : "red.50"}
          border={`1px solid ${issue.handled ? "green.800" : "red.800"}`}
          color={issue.handled ? "green.800" : "red.800"}
          px={2}
          py={1}
          display="inline-block"
        >
          {issue.handled ? "Handled" : "Unhandled"}
        </Box>
      </Td>
      <Td>{new Date(issue.created_at).toLocaleString()}</Td>
      <Td>{issue.resolved ? "Resolved" : "Unresolved"}</Td>
    </Box>
  );
};

export default ErrorRow;
