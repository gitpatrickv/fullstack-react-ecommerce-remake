import { Flex, Text } from "@chakra-ui/react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useAuthQueryStore } from "../../../../store/auth-store";
import useAddToFavorite from "../hooks/useAddToFavorite";
import useGetFavoriteStatus from "../hooks/useGetFavoriteStatus";
import { useUserStore } from "../../../../store/user-store";

const AddToFavoriteButton = () => {
  const params = useParams<{ productId: string }>();
  const productId = params.productId;
  const { authStore, onOpen } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { userId } = useUserStore();
  const { mutate: addToFavorite } = useAddToFavorite(productId!);

  const handleAddToFavoriteClick = () => {
    addToFavorite();
  };

  const { data: getFavoriteStatus } = useGetFavoriteStatus(
    productId!,
    userId ?? 0
  );

  return (
    <Flex
      alignItems="center"
      ml="50px"
      cursor="pointer"
      userSelect="none"
      onClick={jwtToken ? handleAddToFavoriteClick : onOpen}
    >
      {getFavoriteStatus?.favorite ? (
        <IoMdHeart size="30px" color="red" />
      ) : (
        <IoMdHeartEmpty size="30px" color="red" />
      )}
      <Text ml="10px" fontSize="lg" fontWeight="semibold">
        Add to Favorite
      </Text>
    </Flex>
  );
};

export default AddToFavoriteButton;
