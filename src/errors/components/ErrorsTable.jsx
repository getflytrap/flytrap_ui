import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Text,
  Center,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const ErrorsTable = ({
  errors,
  selectedHandled,
  selectedTime,
  selectedProject,
  prevPage,
  nextPage,
  currentPage,
  totalPages,
}) => {
  console.log("pages", currentPage, totalPages);
  if (!errors?.length) {
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
          {errors.map((error) => (
            <Box as="tr" key={error.error_id} mb={2}>
              <Td>
                <Link
                  as={RouterLink}
                  to={`${selectedProject.uuid}/error/${error.uuid}`}
                  _hover={{ color: "blue.500", cursor: "pointer" }}
                  state={{ time: selectedTime, handled: selectedHandled }}
                >
                  {error.name || "Un-named Error"}
                </Link>
              </Td>
              {/* <Td>{error.type}</Td> */}
              <Td>
                <Box
                  as="span"
                  borderRadius="20px"
                  bg={error.handled ? "green.50" : "red.50"}
                  border={`1px solid ${
                    error.handled ? "green.800" : "red.800"
                  }`}
                  color={error.handled ? "green.800" : "red.800"}
                  px={2}
                  py={1}
                  display="inline-block"
                >
                  {error.handled ? "Handled" : "Unhandled"}
                </Box>
              </Td>
              <Td>{new Date(error.created_at).toLocaleString()}</Td>
              <Td>{error.resolved ? "Resolved" : "Unresolved"}</Td>
            </Box>
          ))}
        </Tbody>
      </Table>
      <HStack justify="space-between" mt={4}>
        <Button
          leftIcon={<ChevronLeftIcon />}
          onClick={prevPage}
          isDisabled={currentPage === 1}
        >
          Previous Page
        </Button>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          rightIcon={<ChevronRightIcon />}
          onClick={nextPage}
          isDisabled={currentPage === totalPages}
        >
          Next Page
        </Button>
      </HStack>
    </Box>
  );
};

export default ErrorsTable;
