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
  setSelectedResolved,
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

  const fixedButtonWidth = "90px"; // Ensure fixed width for uniform buttons
  const fixedButtonHeight = "40px"; // Set a height for uniform button height

  return (
    <Box p={4} bg="gray.100">
      <Flex alignItems="center" justifyContent="space-around">
        <Box>
          <Select
            height="50px"
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
        </Box>

        <Stack direction="column" spacing={4}>
          {/* Handled Filter */}
          <Box borderRadius="50px" bg="gray.200" p="4px">
            <Stack direction="row" spacing={4}>
              <Box
                as="button"
                onClick={() => handleHandledChange("Handled")}
                borderRadius="20px"
                p={2}
                width={fixedButtonWidth}
                height={fixedButtonHeight}
                bg={selectedHandled === "Handled" ? "#5ECF5E" : "transparent"}
                color={selectedHandled === "Handled" ? "white" : "black"}
                border={
                  selectedHandled === "Handled"
                    ? "2px solid green.400"
                    : "2px solid transparent"
                }
                transition="background 0.2s, color 0.2s, border 0.2s"
                _hover={{
                  bg: "green.200",
                  color: "white",
                }}
                _focus={{
                  outline: "none",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="sm">Handled</Text>
              </Box>

              <Box
                as="button"
                onClick={() => handleHandledChange("Unhandled")}
                borderRadius="20px"
                p={2}
                width={fixedButtonWidth}
                height={fixedButtonHeight}
                bg={selectedHandled === "Unhandled" ? "#5ECF5E" : "transparent"}
                color={selectedHandled === "Unhandled" ? "white" : "black"}
                border={
                  selectedHandled === "Unhandled"
                    ? "2px solid green.400"
                    : "2px solid transparent"
                }
                transition="background 0.2s, color 0.2s, border 0.2s"
                _hover={{
                  bg: "green.200",
                  color: "white",
                }}
                _focus={{
                  outline: "none",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="sm">Unhandled</Text>
              </Box>

              <Box
                as="button"
                onClick={() => handleHandledChange("All")}
                borderRadius="20px"
                p={2}
                width={fixedButtonWidth}
                height={fixedButtonHeight}
                bg={selectedHandled === "All" ? "#5ECF5E" : "transparent"}
                color={selectedHandled === "All" ? "white" : "black"}
                border={
                  selectedHandled === "All"
                    ? "2px solid green.400"
                    : "2px solid transparent"
                }
                transition="background 0.2s, color 0.2s, border 0.2s"
                _hover={{
                  bg: "green.200",
                  color: "white",
                }}
                _focus={{
                  outline: "none",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="sm">All</Text>
              </Box>
            </Stack>
          </Box>

          {/* Resolved Filter */}
          <Box borderRadius="50px" bg="gray.200" p="4px">
            <Stack direction="row" spacing={4}>
              <Box
                as="button"
                onClick={() => handleResolvedChange("Resolved")}
                borderRadius="20px"
                p={2}
                width={fixedButtonWidth}
                height={fixedButtonHeight}
                bg={selectedResolved === "Resolved" ? "#5ECF5E" : "transparent"}
                color={selectedResolved === "Resolved" ? "white" : "black"}
                border={
                  selectedResolved === "Resolved"
                    ? "2px solid green.400"
                    : "2px solid transparent"
                }
                transition="background 0.2s, color 0.2s, border 0.2s"
                _hover={{
                  bg: "green.200",
                  color: "white",
                }}
                _focus={{
                  outline: "none",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="sm">Resolved</Text>
              </Box>

              <Box
                as="button"
                onClick={() => handleResolvedChange("Unresolved")}
                borderRadius="20px"
                p={2}
                width={fixedButtonWidth}
                height={fixedButtonHeight}
                bg={
                  selectedResolved === "Unresolved" ? "#5ECF5E" : "transparent"
                }
                color={selectedResolved === "Unresolved" ? "white" : "black"}
                border={
                  selectedResolved === "Unresolved"
                    ? "2px solid green.400"
                    : "2px solid transparent"
                }
                transition="background 0.2s, color 0.2s, border 0.2s"
                _hover={{
                  bg: "green.200",
                  color: "white",
                }}
                _focus={{
                  outline: "none",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="sm">Unresolved</Text>
              </Box>

              <Box
                as="button"
                onClick={() => handleResolvedChange("All")}
                borderRadius="20px"
                p={2}
                width={fixedButtonWidth}
                height={fixedButtonHeight}
                bg={selectedResolved === "All" ? "#5ECF5E" : "transparent"}
                color={selectedResolved === "All" ? "white" : "black"}
                border={
                  selectedResolved === "All"
                    ? "2px solid green.400"
                    : "2px solid transparent"
                }
                transition="background 0.2s, color 0.2s, border 0.2s"
                _hover={{
                  bg: "green.200",
                  color: "white",
                }}
                _focus={{
                  outline: "none",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="sm">All</Text>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default FilterBar;
