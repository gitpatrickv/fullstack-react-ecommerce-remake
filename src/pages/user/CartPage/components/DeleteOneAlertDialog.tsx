import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  handleDeleteOneItemClick: () => void;
}

const DeleteOneAlertDialog = ({
  isOpen,
  onClose,
  productName,
  handleDeleteOneItemClick,
}: Props) => {
  const cancelRef = useRef(null);
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent borderRadius="none">
          <AlertDialogHeader>
            <Text fontSize="lg" fontWeight="bold">
              Do you want to remove this item?
            </Text>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text textTransform="capitalize">{productName}</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} borderRadius="none">
              Cancel
            </Button>
            <Button
              bg="red.500"
              _hover={{ bg: "red.600" }}
              onClick={handleDeleteOneItemClick}
              ml="10px"
              borderRadius="none"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteOneAlertDialog;
