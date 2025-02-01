import { Text } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import OrangeButton from "../../../../components/Button/OrangeButton";
import { useAuthQueryStore } from "../../../../store/auth-store";
import useAddToCart from "../hooks/useAddToCart";
import useAddToCartWithVariation from "../hooks/useAddToCartWithVariation";
import { useUserStore } from "../../../../store/user-store";

interface Props {
  count: number;
  size: string;
  color: string;
  hasColorsOrSizes: boolean | undefined;
  isOutOfStock: boolean | undefined;
}

const AddToCartButton = ({
  count,
  size,
  color,
  hasColorsOrSizes,
  isOutOfStock,
}: Props) => {
  const { authStore, onOpen } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const params = useParams<{ productId: string }>();
  const productId = params.productId;
  const { cartId } = useUserStore();

  const { mutate: addToCart } = useAddToCart();

  const handleAddToCartClick = () => {
    addToCart({
      productId: productId!,
      quantity: count,
      cartId: cartId ?? 0,
    });
  };

  const { mutate: addToCartWithVariation } = useAddToCartWithVariation({
    color: color,
    size: size,
  });

  const handleAddToCartWithVariationClick = () => {
    addToCartWithVariation({
      productId: productId!,
      quantity: count,
      cartId: cartId ?? 0,
    });
  };

  return (
    <>
      <OrangeButton
        width="200px"
        onClick={
          !jwtToken
            ? onOpen
            : hasColorsOrSizes
            ? handleAddToCartWithVariationClick
            : handleAddToCartClick
        }
        isDisabled={isOutOfStock ? true : false}
      >
        <FiShoppingCart size="25px" />
        <Text ml="10px">Add To Cart</Text>
      </OrangeButton>
    </>
  );
};

export default AddToCartButton;
