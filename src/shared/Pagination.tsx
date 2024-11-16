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
