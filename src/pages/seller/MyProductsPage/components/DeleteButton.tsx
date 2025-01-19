import { Box, useDisclosure } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import DynamicIconButton from "../../../../components/Button/DynamicIconButton";
import useChangeResourceStatus from "../../../../hooks/useChangeResourceStatus";
import AlertDialogBox from "../../../../components/AlertDialog/AlertDialogBox";
interface IdProps {
  productId: number;
  productName: string;
}

const DeleteButton = ({ productId, productName }: IdProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useChangeResourceStatus({
    module: "product",
    id: productId,
    status: "DELETED",
  });

  const handleDeleteClick = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["allData", "product", 12],
        });
        onClose();
      },
    });
  };

  const [isHover, setIsHover] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box color="red" onClick={onOpen}>
        <DynamicIconButton
          isHover={isHover}
          setIsHover={setIsHover}
          size="30px"
          icon={MdDeleteOutline}
          text="Delete"
          color="red"
        />
      </Box>
      <AlertDialogBox
        isOpen={isOpen}
        onClose={onClose}
        title={"Do you want to permanently delete this item?"}
        content={productName}
        buttonName={"Delete"}
        color={"red.500"}
        hoverColor={"red.600"}
        fn={handleDeleteClick}
        textTransform="capitalize"
      />
    </>
  );
};

export default DeleteButton;
