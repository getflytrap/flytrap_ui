import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";

type WarningModalProps = {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
};

const WarningModal = ({ isOpen, onClose, errorMessage }: WarningModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="red.500" color="white">
        <ModalHeader>Error</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="2xl">{errorMessage}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WarningModal;
