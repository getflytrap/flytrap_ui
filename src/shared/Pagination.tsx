import { HStack, Button, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
};

const PaginationControls = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: PaginationControlsProps) => {
  return (
    <HStack justify="space-between" mt={4}>
      <Button
        leftIcon={<ChevronLeftIcon />}
        onClick={onPrevPage}
        isDisabled={currentPage === 1}
      >
        Previous Page
      </Button>
      <Text>
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        rightIcon={<ChevronRightIcon />}
        onClick={onNextPage}
        isDisabled={currentPage === totalPages}
      >
        Next Page
      </Button>
    </HStack>
  );
};

export default PaginationControls;
