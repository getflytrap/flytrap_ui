import React, { useState, useContext } from "react";
import { Box, Select, Flex, Stack, Text } from "@chakra-ui/react";

const FilterBar = ({
  selectedHandled,
  setSelectedHandled,
  setSelectedTime,
}) => {
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleResolvedChange = (value) => {
    setSelectedHandled(value);
  };

  return (
    <Box p={4} bg="gray.100">
      <Flex alignItems="center">
        <Select
          placeholder="Select time period"
          onChange={handleTimeChange}
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

        <Stack direction="row" spacing={0}>
          {["All", "Handled", "Unhandled"].map((option) => (
            <Box
              key={option}
              as="button"
              onClick={() => handleResolvedChange(option)}
              borderRadius="20px"
              p={2}
              bg={selectedHandled === option ? "blue.500" : "transparent"}
              color={selectedHandled === option ? "white" : "black"}
              border={
                selectedHandled === option
                  ? "2px solid blue"
                  : "2px solid transparent"
              }
              transition="background 0.2s, color 0.2s, border 0.2s"
              _hover={{ bg: "blue.300", color: "white" }}
            >
              <Text>{option}</Text>
            </Box>
          ))}
        </Stack>
      </Flex>
    </Box>
  );
};

export default FilterBar;
