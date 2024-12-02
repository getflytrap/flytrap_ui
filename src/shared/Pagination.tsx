import { HStack, Button, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
};

/**
 * The `PaginationControls` component provides a simple pagination UI
 * with previous and next buttons and displays the current page number
 * relative to the total number of pages.
 *
 * @param currentPage - The current active page number.
 * @param totalPages - The total number of pages available.
 * @param onPrevPage - Callback function to navigate to the previous page.
 * @param onNextPage - Callback function to navigate to the next page.
 * @returns A responsive pagination control component.
 */
const PaginationControls = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: PaginationControlsProps) => {
  return (
    <HStack justify="center" my={8}>
      <Button
        leftIcon={<ChevronLeftIcon />}
        onClick={onPrevPage}
        isDisabled={currentPage === 1}
      ></Button>
      <Text variant="light">
        {currentPage} / {totalPages}
      </Text>
      <Button
        rightIcon={<ChevronRightIcon />}
        onClick={onNextPage}
        isDisabled={currentPage >= totalPages}
      ></Button>
    </HStack>
  );
};

export default PaginationControls;
