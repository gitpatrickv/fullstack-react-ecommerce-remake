import { Flex, Text } from "@chakra-ui/react";
import { LiaStoreSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

interface Props {
  storeId: number;
  storeName: string;
  height?: string;
}

const ViewShopButton = ({ storeId, storeName, height }: Props) => {
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate(`/store/${storeId}/${storeName}`);
  };

  return (
    <>
      <Flex
        height={height}
        borderRadius="none"
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        cursor="pointer"
        width="130px"
        borderColor="#DCDCDC"
        _hover={{ bg: "#F8F8F8" }}
        color="gray.600"
        onClick={handleNavigateClick}
      >
        <LiaStoreSolid size="20px" />
        <Text ml="10px" fontSize="sm" fontWeight="semibold">
          View Shop
        </Text>
      </Flex>
    </>
  );
};

export default ViewShopButton;
