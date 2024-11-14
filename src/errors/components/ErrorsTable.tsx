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
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../shared/LoadingSpinner";
import PaginationControls from "../../shared/Pagination";
import { useProjects } from "../../hooks/useProjects";
import { ErrorData, Rejection } from "../../types";
import { getIssues } from "../../services";
import {
  convertHandledToBoolean,
  convertToTimeStamp,
  convertResolvedToBoolean,
} from "../../helpers";
import ErrorRow from "./ErrorRow";

const ERROR_LIMIT_PER_PAGE = 10;

interface ErrorsTableProps {
  selectedHandled: string;
  selectedTime: string;
  selectedResolved: string;
}

const ErrorsTable = ({
  selectedHandled,
  selectedTime,
  selectedResolved,
}: ErrorsTableProps) => {
  const { project_uuid: projectUuid } = useParams<{ project_uuid: string }>();
  const { projects, selectedProject, selectProject, fetchProjectsForUser } =
    useProjects();

  const [issues, setIssues] = useState<(ErrorData | Rejection)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const loadProject = async () => {
      if (projects.length === 0) {
        await fetchProjectsForUser();
      }

      if (!selectedProject && projectUuid && projects.length > 0) {
        selectProject(projectUuid);
      }
    };

    if (!selectedProject || projects.length === 0) {
      loadProject();
    }
  }, [projects, projectUuid]);

  // whenever project changes, currentPage is reset to 1
  useEffect(() => {
    if (selectedProject) {
      setCurrentPage(1);
      fetchIssues(1);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      fetchIssues(currentPage);
    }
  }, [selectedProject, currentPage]);

  useEffect(() => {
    if (selectedProject) {
      fetchIssues(1); // Reset to page 1 when filters change
    }
  }, [selectedHandled, selectedTime, selectedResolved]);

  const fetchIssues = async (page: number = 1) => {
    setIsLoading(true);
    try {
      const { data } = await getIssues(
        selectedProject?.uuid,
        convertHandledToBoolean(selectedHandled), // null for "All"
        convertResolvedToBoolean(selectedResolved), // null for "All"
        convertToTimeStamp(selectedTime), // null for "Forever"
        page,
        ERROR_LIMIT_PER_PAGE
      );

      setIssues(data.issues);
      if (data.current_page && data.total_pages) {
        setCurrentPage(data.current_page);
        setTotalPages(data.total_pages);
      }
    } catch (e) {
      console.error(e);
      toast({ title: "Failed to load error data.", status: "error" });
    } finally {
      setIsLoading(false);
    }
  };

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
    <Box p={4}>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Error Title</Th>
            {/* <Th>Type</Th> */}
            <Th>Handled</Th>
            <Th>Time</Th>
            <Th>Status</Th>
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
