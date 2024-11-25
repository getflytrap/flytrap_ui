import { Center, Spinner } from "@chakra-ui/react";


/**
 * A full-page loading spinner component styled with Chakra UI.
 * It centers a customizable spinner vertically and horizontally.
 *
 * @returns A centered loading spinner component.
 */
const LoadingSpinner = () => (
  <Center height="100vh">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Center>
);

export default LoadingSpinner;
