import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Heading, Text, useToast } from "@chakra-ui/react";

import ErrorsTable from "../components/ErrorsTable";
import FilterBar from "../components/FilterBar";

import {
  HandledFilter,
  TimeFilter,
  ResolvedFilter,
  ErrorData,
  Rejection,
} from "../../types";
import {
  convertHandledToBoolean,
  convertToTimeStamp,
  convertResolvedToBoolean,
} from "../../helpers";
import { getIssues } from "../../services";
import { useProjects } from "../../hooks/useProjects";

const ERROR_LIMIT_PER_PAGE = 10;

const ErrorDisplay = () => {
  const [issues, setIssues] = useState<(ErrorData | Rejection)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidProject, setIsInvalidProject] = useState(false);

  const [selectedHandled, setSelectedHandled] = useState<HandledFilter>("All");
  const [selectedResolved, setSelectedResolved] =
    useState<ResolvedFilter>("All");
  const [selectedTime, setSelectedTime] = useState<TimeFilter>("Forever");

  const { projects, selectedProject, selectProject, fetchProjectsForUser } =
    useProjects();
  const { project_uuid: projectUuid } = useParams<{ project_uuid: string }>();
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    const loadProject = async () => {
      if (projects.length === 0) await fetchProjectsForUser();

      if (!projectUuid || !projects.some((p) => p.uuid === projectUuid)) {
        setIsInvalidProject(true);
        return;
      }

      setIsInvalidProject(false);

      if (!selectedProject && projectUuid && projects.length > 0) {
        selectProject(projectUuid);
      }
    };

    loadProject();
  }, [
    projects,
    projectUuid,
    selectedProject,
    selectProject,
    fetchProjectsForUser,
  ]);

  useEffect(() => {
    if (selectedProject) {
      setCurrentPage(1);
      fetchIssues(1);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) fetchIssues(currentPage);
  }, [selectedProject, currentPage]);

  useEffect(() => {
    if (selectedProject) fetchIssues(1);
  }, [selectedHandled, selectedTime, selectedResolved]);

  useEffect(() => {
    const { handled, time, resolved } = location.state || {};
    if (handled) setSelectedHandled(handled);
    if (resolved) setSelectedResolved(resolved);
    if (time) setSelectedTime(time);
  }, [location.state]);

  const handleRefresh = () => {
    fetchIssues(currentPage);
  };

  const fetchIssues = async (page: number = 1) => {
    setIsLoading(true);
    try {
      const { data } = await getIssues(
        selectedProject?.uuid,
        convertHandledToBoolean(selectedHandled),
        convertResolvedToBoolean(selectedResolved),
        convertToTimeStamp(selectedTime),
        page,
        ERROR_LIMIT_PER_PAGE,
      );

      setIssues(data.issues);
      if (data.current_page && data.total_pages) {
        setCurrentPage(data.current_page);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.error(error);
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

  if (isInvalidProject) {
    return (
      <Box mx={4} my={6}>
        <Heading as="h2" fontSize="2rem" my="30px">
          Invalid Project
        </Heading>
        <Text>
          The project you're trying to access does not exist or you don't have
          permission to view it.
        </Text>
      </Box>
    );
  }

  return (
    <Box overflowY="auto" mx={4}>
      <Heading as="h2" fontSize="2rem" my="30px">
        Issues
      </Heading>
      <FilterBar
        selectedHandled={selectedHandled}
        setSelectedHandled={setSelectedHandled}
        setSelectedTime={setSelectedTime}
        selectedResolved={selectedResolved}
        setSelectedResolved={setSelectedResolved}
        handleRefresh={handleRefresh}
      />
      <ErrorsTable
        issues={issues}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        isLoading={isLoading}
        selectedHandled={selectedHandled}
        selectedTime={selectedTime}
        selectedResolved={selectedResolved}
        selectedProject={selectedProject}
      />
    </Box>
  );
};

export default ErrorDisplay;
