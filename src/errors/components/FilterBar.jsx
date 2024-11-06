import React, { useState, useContext } from "react";
import {
  Box,
  Select,
  Button,
  Flex,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

const FilterBar = ({ selectedTime, setSelectedTime }) => {
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
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
      </Flex>
    </Box>
  );
};

export default FilterBar;
