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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import DynamicIconButton from "../../../../components/Button/DynamicIconButton";
import { CartItem } from "../../../../entities/CartItem";
import { formatCurrency } from "../../../../utilities/formatCurrency";
import useUpdateQuantity from "../hooks/useUpdateQuantity";

interface Props {
  cartItem: CartItem;
}

const CartItemCard = ({ cartItem }: Props) => {
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
  const { mutate } = useUpdateQuantity();

  useEffect(() => {
    setTotalItemPrice(cartItem.inventory.price * quantity);
  }, [quantity]);

  const handleUpdateMinusQuantityClick = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    mutate({
      cartItemId: cartItem.cartItemId,
      newQuantity: newQuantity,
    });
  };

  const handleUpdatePlusQuantityClick = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    mutate({
      cartItemId: cartItem.cartItemId,
      newQuantity: newQuantity,
    });
  };

  return (
    <Card borderRadius="none" padding={4}>
      <Grid
        templateColumns="1fr 0.2fr 0.4fr 0.2fr 0.2fr"
        templateAreas={`"content1 content2 content3 content4 content5"`}
      >
        <GridItem area="content1">
          <Flex alignItems="center">
            <Checkbox colorScheme="orange" />
            <Image src={cartItem.productImage} boxSize="90px" ml="20px" />
            <Text ml="20px">{cartItem.productName}</Text>
          </Flex>
        </GridItem>
        <GridItem
          area="content2"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text>{formatCurrency(cartItem.inventory.price)}</Text>
        </GridItem>
        <GridItem
          area="content3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          userSelect="none"
        >
          <Button
            variant="unstyled"
            {...boxStyle}
            onClick={handleUpdateMinusQuantityClick}
            // isDisabled={quantity === 1}
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
        <GridItem
          area="content4"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontWeight="semibold"
        >
          <Text color="#E64A19">{formatCurrency(totalItemPrice)}</Text>
        </GridItem>
        <GridItem
          area="content5"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box color="red">
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
  );
};

export default CartItemCard;
