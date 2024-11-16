import { useState, useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ErrorsTable from "../components/ErrorsTable";
import FilterBar from "../components/FilterBar";
import { HandledFilter, TimeFilter, ResolvedFilter } from "../../types";

const ErrorDisplay = () => {
  const [selectedHandled, setSelectedHandled] = useState<HandledFilter>("All");
  const [selectedResolved, setSelectedResolved] =
    useState<ResolvedFilter>("All");
  const [selectedTime, setSelectedTime] = useState<TimeFilter>("Forever");
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { handled, time, resolved } = location.state;

      if (handled) {
        setSelectedHandled(handled);
      }
      if (resolved) {
        setSelectedResolved(resolved);
      }
      if (time) {
        setSelectedTime(time);
      }
    }
  }, [location.state]);

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
      />
      <ErrorsTable
        selectedHandled={selectedHandled}
        selectedTime={selectedTime}
        selectedResolved={selectedResolved}
      />
    </Box>
  );
};

export default ErrorDisplay;
