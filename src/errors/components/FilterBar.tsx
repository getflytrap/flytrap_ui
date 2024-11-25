import { Box, Select, Flex, Text, Divider, IconButton } from "@chakra-ui/react";
import { MdRefresh } from "react-icons/md";
import { HandledFilter, TimeFilter, ResolvedFilter } from "../../types";

interface FilterBarProps {
  selectedHandled: HandledFilter;
  setSelectedHandled: React.Dispatch<React.SetStateAction<HandledFilter>>;
  setSelectedTime: React.Dispatch<React.SetStateAction<TimeFilter>>;
  selectedResolved: ResolvedFilter;
  setSelectedResolved: React.Dispatch<React.SetStateAction<ResolvedFilter>>;
  handleRefresh: () => void;
}

/**
 * FilterBar
 *
 * Renders a filter bar for the issues table.
 * - Includes dropdown for selecting a time period.
 * - Provides buttons to toggle "Handled" and "Resolved" filters.
 * - Displays a refresh button to reload the current issue data.
 *
 * Props:
 * - `selectedHandled`: Current selection for the "Handled" filter.
 * - `setSelectedHandled`: Setter for the "Handled" filter.
 * - `setSelectedTime`: Setter for the time filter.
 * - `selectedResolved`: Current selection for the "Resolved" filter.
 * - `setSelectedResolved`: Setter for the "Resolved" filter.
 * - `handleRefresh`: Function to trigger data reload.
 *
 * @param props - The component props.
 */
const FilterBar = ({
  selectedHandled,
  setSelectedHandled,
  setSelectedTime,
  selectedResolved,
  setSelectedResolved,
  handleRefresh,
}: FilterBarProps) => {
  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value as TimeFilter);
  };

  const handleHandledChange = (option: HandledFilter) => {
    setSelectedHandled(option);
  };

  const handleResolvedChange = (option: ResolvedFilter) => {
    setSelectedResolved(option);
  };

  return (
    <Box p={4} mb={8} bg="gray.100" borderRadius="8px" boxShadow="sm">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
      >
        {/* Time Filter Dropdown */}
        <Box className="time-select">
          <Select
            height="50px"
            placeholder="Select Time Period"
            onChange={handleTimeChange}
            bg="gray.200"
            width="200px"
            fontSize="sm"
          >
            <option value="Today">Today</option>
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 14 days">Last 14 days</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 90 days">Last 90 days</option>
            <option value="Forever">Forever</option>
          </Select>
        </Box>

        <Flex gap={2} flexWrap="wrap">
          <Flex align="center" gap={2} width="286px">
            {["Handled", "Unhandled", "All"].map((status) => (
              <Box
                key={status}
                borderRadius="2px"
                borderBottom={
                  selectedHandled === status
                    ? "4px solid #186A4A"
                    : "4px solid transparent"
                }
              >
                <Box
                  as="button"
                  onClick={() => handleHandledChange(status as HandledFilter)}
                  borderRadius="8px"
                  p={2}
                  width="90px"
                  height="50px"
                  bg="transparent"
                  color={selectedHandled === status ? "brand.600" : "gray.900"}
                  transition="all 0.2s ease"
                  _hover={
                    selectedHandled === status
                      ? {
                          bg: "gray.200",
                          color: "brand.600",
                          borderBottomLeftRadius: "2px",
                          borderBottomRightRadius: "2px",
                        }
                      : {
                          bg: "gray.200",
                          color: "brand.600",
                        }
                  }
                  _focus={{
                    outline: "none",
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontSize="sm">{status}</Text>
                </Box>
              </Box>
            ))}
          </Flex>

          <Divider
            orientation="vertical"
            height="40px"
            borderColor="gray.400"
            display={{ base: "none", lg: "block" }}
            mt={5}
            mb={2}
            mx={5}
          />

          {/* Resolved Filter */}
          <Flex align="center" gap={2} width="286px">
            {["Resolved", "Unresolved", "All"].map((status) => (
              <Box
                key={status}
                borderRadius="2px"
                borderBottom={
                  selectedResolved === status
                    ? "4px solid #186A4A"
                    : "4px solid transparent"
                }
              >
                <Box
                  as="button"
                  onClick={() => handleResolvedChange(status as ResolvedFilter)}
                  borderRadius="8px"
                  p={2}
                  width="90px"
                  height="50px"
                  bg="transparent"
                  color={selectedResolved === status ? "brand.600" : "gray.900"}
                  transition="all 0.2s ease"
                  _hover={
                    selectedResolved === status
                      ? {
                          bg: "gray.200",
                          color: "brand.600",
                          borderBottomLeftRadius: "2px",
                          borderBottomRightRadius: "2px",
                        }
                      : {
                          bg: "gray.200",
                          color: "brand.600",
                        }
                  }
                  _focus={{
                    outline: "none",
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontSize="sm">{status}</Text>
                </Box>
              </Box>
            ))}
          </Flex>
          <IconButton
            icon={<MdRefresh />}
            aria-label="Refresh Issues"
            onClick={handleRefresh}
            colorScheme="teal"
            size="md"
            bg="brand.500"
            color="white"
            ml={4}
            margin="30px"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default FilterBar;
