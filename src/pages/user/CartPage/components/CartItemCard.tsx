import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import AlertDialogBox from "../../../../components/AlertDialog/AlertDialogBox";
import DynamicIconButton from "../../../../components/Button/DynamicIconButton";
import { CartItem } from "../../../../entities/CartItem";
import useCartStore from "../../../../store/cart-store";
import { formatCurrency } from "../../../../utilities/formatCurrency";
import useDeleteOneCartItem from "../hooks/useDeleteOneCartItem";
import useUpdateQuantity from "../hooks/useUpdateQuantity";

interface Props {
  cartItem: CartItem;
  handleAddRemoveIdChange: (value: number) => void;
}

const CartItemCard = ({ cartItem, handleAddRemoveIdChange }: Props) => {
  const centerFlex = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const boxStyle = {
    height: "30px",
    width: "20px",
    border: "1px solid",
    borderColor: "#E0E0E0",
    cursor: "pointer",
    borderRadius: "none",
    display: "flex",
  };
  const [isHover, setIsHover] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const { mutate: updateOneItem } = useUpdateQuantity();
  const { itemIds, setItemIds } = useCartStore();

  const totalItemPrice = cartItem.inventory.price * cartItem.quantity;

  const handleUpdateMinusQuantityClick = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    updateOneItem({
      cartItemId: cartItem.cartItemId,
      newQuantity: newQuantity,
    });
  };

  const handleUpdatePlusQuantityClick = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateOneItem({
      cartItemId: cartItem.cartItemId,
      newQuantity: newQuantity,
    });
  };

  const { mutate: deleteOneItem } = useDeleteOneCartItem();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteOneItemClick = () => {
    deleteOneItem(cartItem.cartItemId, {
      onSuccess: () => {
        onClose();
        setItemIds((prevIds) => {
          const updatedIds = new Set(prevIds);
          if (updatedIds.has(cartItem.cartItemId)) {
            updatedIds.delete(cartItem.cartItemId);
          }
          return updatedIds;
        });
      },
    });
  };

  return (
    <>
      <Card borderRadius="none" padding={4}>
        <Grid
          templateColumns="1fr 0.2fr 0.4fr 0.2fr 0.2fr"
          templateAreas={`"content1 content2 content3 content4 content5"`}
        >
          <GridItem area="content1">
            <Flex alignItems="center">
              <Checkbox
                colorScheme="orange"
                onChange={() => handleAddRemoveIdChange(cartItem.cartItemId)}
                isChecked={itemIds.has(cartItem.cartItemId)}
              />
              <Image src={cartItem.productImage} boxSize="90px" ml="20px" />
              <Flex flexDirection="column">
                <Text ml="20px" textTransform="capitalize">
                  {cartItem.productName}
                </Text>
                {cartItem.inventory.color && cartItem.inventory.size && (
                  <Text ml="20px" color="gray.500">
                    Variation: {cartItem.inventory.color},{" "}
                    {cartItem.inventory.size}
                  </Text>
                )}
              </Flex>
            </Flex>
          </GridItem>
          <GridItem area="content2" {...centerFlex}>
            <Text>{formatCurrency(cartItem.inventory.price)}</Text>
          </GridItem>
          <GridItem area="content3" {...centerFlex} userSelect="none">
            <Button
              variant="unstyled"
              {...boxStyle}
              onClick={quantity > 1 ? handleUpdateMinusQuantityClick : onOpen}
            >
              <FiMinus />
            </Button>
            <Center
              border="1px solid"
              width="60px"
              height="30px"
              borderColor="#E0E0E0"
              fontWeight="semibold"
            >
              <Text>{quantity}</Text>
            </Center>

            <Button
              variant="unstyled"
              {...boxStyle}
              onClick={handleUpdatePlusQuantityClick}
              isDisabled={quantity === cartItem.inventory.quantity}
            >
              <GoPlus />
            </Button>
          </GridItem>
          <GridItem area="content4" {...centerFlex}>
            <Text color="#E64A19" fontWeight="semibold">
              {formatCurrency(totalItemPrice)}
            </Text>
          </GridItem>
          <GridItem area="content5" {...centerFlex}>
            <Box color="red" onClick={handleDeleteOneItemClick}>
              <DynamicIconButton
                isHover={isHover}
                setIsHover={setIsHover}
                size="30px"
                icon={MdDeleteOutline}
                text="Delete"
                color="red"
              />
            </Box>
          </GridItem>
        </Grid>
      </Card>
      <AlertDialogBox
        isOpen={isOpen}
        onClose={onClose}
        title={"Do you want to remove this item?"}
        content={cartItem.productName}
        buttonName={"Delete"}
        color={"red.500"}
        hoverColor={"red.600"}
        fn={handleDeleteOneItemClick}
      />
    </>
  );
};

export default CartItemCard;
