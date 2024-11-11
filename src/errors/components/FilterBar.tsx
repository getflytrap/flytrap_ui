import { Box, Select, Flex, Stack, Text } from "@chakra-ui/react";
import { HandledFilter, TimeFilter, ResolvedFilter } from "../../types";

interface FilterBarProps {
  selectedHandled: HandledFilter;
  setSelectedHandled: React.Dispatch<React.SetStateAction<HandledFilter>>;
  setSelectedTime: React.Dispatch<React.SetStateAction<TimeFilter>>;
  selectedResolved: ResolvedFilter;
  setSelectedResolved: React.Dispatch<React.SetStateAction<ResolvedFilter>>;
}

const FilterBar = ({
  selectedHandled,
  setSelectedHandled,
  setSelectedTime,
  selectedResolved,
  setSelectedResolved
}: FilterBarProps) => {
  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value as TimeFilter);
  };

  const handleHandledChange = (option: HandledFilter) => {
    setSelectedHandled(option);
  };

  const handleResolvedChange = (option: HandledFilter) => {
    setSelectedResolved(option);
  };

  const fixedButtonWidth = "90px";

  return (
    <Box p={4} bg="gray.100">
      <Flex alignItems="center">
        <Select
          placeholder="Select time period"
          onChange={handleTimeChange}
          bg="gray.200"
          width="200px"
        >
          <option value="Today">Today</option>
          <option value="Last 7 days">Last 7 days</option>
          <option value="Last 14 days">Last 14 days</option>
          <option value="Last 30 days">Last 30 days</option>
          <option value="Last 90 days">Last 90 days</option>
          <option value="Forever">Forever</option>
        </Select>

        <Box mx={4} />

        <Box borderRadius="50px" bg="gray.200" p="4px">
          <Stack direction="row" spacing={6}>
            {["Handled", "Unhandled", "All"].map((option) => (
              <Box
                key={option}
                as="button"
                onClick={() => handleHandledChange(option as HandledFilter)}
                borderRadius="20px"
                p={2}
                width={fixedButtonWidth}
                bg={selectedHandled === option ? "blue.500" : "transparent"}
                color={selectedHandled === option ? "white" : "black"}
                border={
                  selectedHandled === option
                    ? "2px solid blue"
                    : "2px solid transparent"
                }
                transition="background 0.2s, color 0.2s, border 0.2s"
                _hover={{
                  bg: "blue.300",
                  color: "white",
                }}
                _focus={{
                  outline: "none",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text>{option}</Text>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box borderRadius="50px" bg="gray.200" p="4px">
          <Stack direction="row" spacing={6}>
            {["Resolved", "Unresolved", "All"].map((option) => (
              <Box
                key={option}
                as="button"
                onClick={() => handleResolvedChange(option as ResolvedFilter)}
                borderRadius="20px"
                p={2}
                width={fixedButtonWidth}
                bg={selectedResolved === option ? "blue.500" : "transparent"}
                color={selectedResolved === option ? "white" : "black"}
                border={
                  selectedResolved === option
                    ? "2px solid blue"
                    : "2px solid transparent"
                }
                transition="background 0.2s, color 0.2s, border 0.2s"
                _hover={{
                  bg: "blue.300",
                  color: "white",
                }}
                _focus={{
                  outline: "none",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text>{option}</Text>
              </Box>
            ))}
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default FilterBar;
