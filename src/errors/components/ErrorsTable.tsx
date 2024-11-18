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
  Button,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { MdRefresh } from "react-icons/md"; // Import the refresh icon
import { eventBus } from "../../hooks/eventBus";

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
  const [isMobile, setIsMobile] = useState(false); // State to handle window size
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      fetchIssues(1);
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
      toast({
        title: "Failed to load error data.",
        status: "error",
        duration: 3000,
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    // Refresh the current page's issues
    fetchIssues(currentPage);
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
    <Box>
      {/* Flex container for filter buttons and refresh button */}
      <Flex align="center" justify="space-between" mb={4}>
        <Box>
          {/* Here, we assume you have "resolved", "unresolved", "all" buttons */}
          {/* Add your filter buttons here (not shown in the original code) */}
        </Box>
        <IconButton
          icon={<MdRefresh />}
          aria-label="Refresh Issues"
          onClick={handleRefresh}
          colorScheme="teal"
          variant="outline"
          size="sm"
          ml={4} // Space it out from the other buttons
        />
      </Flex>

      <Table variant="striped" colorScheme="gray" width="100%" mx="auto">
        <Thead>
          <Tr>
            <Th fontSize="sm"></Th>
            <Th fontSize="sm"></Th>
            {/* Conditionally render the 'Time' and 'Status' columns */}
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
