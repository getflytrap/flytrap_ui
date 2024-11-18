import { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Text,
  Center,
} from "@chakra-ui/react";
import { ErrorData, Rejection, Project } from "../../types";

import LoadingSpinner from "../../shared/LoadingSpinner";
import PaginationControls from "../../shared/Pagination";

import ErrorRow from "./ErrorRow";

interface ErrorsTableProps {
  issues: (ErrorData | Rejection)[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  isLoading: boolean;
  selectedHandled: string;
  selectedTime: string;
  selectedResolved: string;
  selectedProject: Project | null;
}

const ErrorsTable = ({
  issues,
  currentPage,
  setCurrentPage,
  totalPages,
  isLoading,
  selectedHandled,
  selectedTime,
  selectedProject,
}: ErrorsTableProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (!issues?.length) {
    return (
      <Center>
        <Text
          fontSize="5xl"
          p="50"
          m={50}
          border="1px solid gray"
          backgroundColor="gray.200"
          borderRadius="100px"
        >
          No Data
        </Text>
      </Center>
    );
  }

  return (
    <Box>
      <Table variant="striped" colorScheme="gray" width="100%" mx="auto">
        <Thead>
          <Tr>
            <Th fontSize="sm"></Th>
            <Th fontSize="sm"></Th>
            {!isMobile && <Th fontSize="sm">Time</Th>}
            {!isMobile && <Th fontSize="sm">Status</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {issues.map((issue) => (
            <ErrorRow
              key={issue.uuid}
              issue={issue}
              selectedProject={selectedProject}
              selectedHandled={selectedHandled}
              selectedTime={selectedTime}
            />
          ))}
        </Tbody>
      </Table>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={() => setCurrentPage(currentPage - 1)}
        onNextPage={() => setCurrentPage(currentPage + 1)}
      />
    </Box>
  );
};

export default ErrorsTable;
