import { Box, Td, Link, Tr, useBreakpointValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ErrorData, Rejection } from "../../types";
import { Project } from "../../types";
import {
  IoWarningOutline,
  IoCheckmarkCircleOutline,
  IoShieldCheckmarkOutline,
  IoHourglassOutline,
} from "react-icons/io5";

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

  // Use useBreakpointValue to check screen size and conditionally render columns
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Tr key={issue.uuid} mb={2}>
      {/* Render Issue Name only on small screens */}
      <Td minW="250px" maxW="250px" whiteSpace="normal">
        <Link
          as={RouterLink}
          to={
            isErrorData(issue)
              ? `/projects/${selectedProject?.uuid}/issues/errors/${issue.uuid}`
              : `/projects/${selectedProject?.uuid}/issues/rejections/${issue.uuid}`
          }
          _hover={{ color: "blue.500", cursor: "pointer" }}
          state={{ time: selectedTime, handled: selectedHandled }}
        >
          {isErrorData(issue) ? issue.name || "Un-named Error" : issue.value}
        </Link>
      </Td>

      {/* Render "Handled" status */}
      <Td>
        <Box
          as="span"
          borderRadius="8px"
          bg={issue.handled ? "green.50" : "red.50"}
          border={`1px solid ${issue.handled ? "green.800" : "red.800"}`}
          color={issue.handled ? "green.800" : "red.800"}
          px={2}
          py={1}
          display="inline-flex"
          gap={1}
        >
          {issue.handled ? <IoShieldCheckmarkOutline /> : <IoWarningOutline />}
          {issue.handled ? "Handled" : "Unhandled"}
        </Box>
      </Td>

      {/* Conditionally render time and resolved status only on larger screens */}
      {!isSmallScreen && (
        <>
          <Td>
            {new Date(issue.created_at).toLocaleString([], {
              year: "2-digit",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Td>
          <Td>{(issue as ErrorData).total_occurrences ?? ""}</Td>
          <Td>{(issue as ErrorData).distinct_users ?? ""}</Td>
          <Td>
            {issue.resolved ? (
              <IoCheckmarkCircleOutline />
            ) : (
              <IoHourglassOutline />
            )}
          </Td>
        </>
      )}
    </Tr>
  );
};

export default ErrorRow;
