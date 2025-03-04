import { Box, Card, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MdOutlinePlaylistAdd, MdOutlinePlaylistRemove } from "react-icons/md";
import useChangeResourceStatus from "../../../../hooks/useChangeResourceStatus";

interface Props {
  productId: number;
  status: string;
}

const DelistButton = ({ productId, status }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useChangeResourceStatus();

  const handleListClick = () => {
    mutate(
      {
        module: "product",
        id: productId,
        status: status === "SUSPENDED" ? "LISTED" : "SUSPENDED",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["allData", "product", 12],
          });
        },
      }
    );
  };

  const [isHover, setIsHover] = useState(false);

  return (
    <Box position="relative">
      {isHover && (
        <Card position="absolute" bottom="30px" left="-15px" padding={2}>
          <Text
            fontWeight="semibold"
            color={status === "SUSPENDED" ? "#1877F2" : "#E64A19"}
          >
            {status === "SUSPENDED" ? "Relist" : "Delist"}
          </Text>
        </Card>
      )}
      <Box
        onClick={handleListClick}
        cursor="pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        color={status === "SUSPENDED" ? "#1877F2" : "#E64A19"}
      >
        {status === "SUSPENDED" ? (
          <MdOutlinePlaylistAdd size="30px" />
        ) : (
          <MdOutlinePlaylistRemove size="30px" />
        )}
      </Box>
    </Box>
  );
};

export default DelistButton;
