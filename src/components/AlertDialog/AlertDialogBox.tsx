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
  title: string;
  content: string;
  buttonName: string;
  color: string;
  hoverColor: string;
  fn: () => void;
}

const AlertDialogBox = ({
  isOpen,
  onClose,
  title,
  content,
  buttonName,
  color,
  hoverColor,
  fn,
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
            <Text fontSize="lg" fontWeight="semibold">
              {title}
            </Text>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text textTransform="capitalize" fontSize="lg">
              {content}
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} borderRadius="none">
              Cancel
            </Button>
            <Button
              bg={color}
              _hover={{ bg: hoverColor }}
              _active={{ bg: color }}
              onClick={fn}
              ml="10px"
              borderRadius="none"
            >
              {buttonName}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertDialogBox;
