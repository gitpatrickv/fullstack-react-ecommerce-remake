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
import { useEffect, useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import AlertDialogBox from "../../../../components/AlertDialog/AlertDialogBox";
import DynamicIconButton from "../../../../components/Button/DynamicIconButton";
import { CartItem } from "../../../../entities/CartItem";
import { formatCurrency } from "../../../../utilities/formatCurrency";
import useDeleteOneCartItem from "../hooks/useDeleteOneCartItem";
import useUpdateQuantity from "../hooks/useUpdateQuantity";

interface Props {
  cartItem: CartItem;
}

const CartItemCard = ({ cartItem }: Props) => {
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
  const [totalItemPrice, setTotalItemPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const { mutate: updateOneItem } = useUpdateQuantity();

  useEffect(() => {
    setTotalItemPrice(cartItem.inventory.price * quantity);
  }, [quantity]);

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
              <Checkbox colorScheme="orange" />
              <Image src={cartItem.productImage} boxSize="90px" ml="20px" />
              <Text ml="20px" textTransform="capitalize">
                {cartItem.productName}
              </Text>
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
