import { Box } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import DynamicIconButton from "../../../../components/Button/DynamicIconButton";
import useChangeResourceStatus from "../../../../hooks/useChangeResourceStatus";
interface IdProps {
  productId: number;
}

const DeleteButton = ({ productId }: IdProps) => {
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
          queryKey: ["allData", "product", 10],
        });
      },
    });
  };

  const [isHover, setIsHover] = useState(false);

  return (
    <Box color="red" onClick={handleDeleteClick}>
      <DynamicIconButton
        isHover={isHover}
        setIsHover={setIsHover}
        size="30px"
        icon={MdDeleteOutline}
        text="Delete"
        color="red"
      />
    </Box>
  );
};

export default DeleteButton;
