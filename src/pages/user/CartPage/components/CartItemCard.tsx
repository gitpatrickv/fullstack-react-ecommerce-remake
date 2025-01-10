import {
  Box,
  Card,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import DynamicIconButton from "../../../../components/Button/DynamicIconButton";
import { CartItem } from "../../../../entities/CartItem";
import { formatCurrency } from "../../../../utilities/formatCurrency";

interface Props {
  cartItem: CartItem;
}

const CartItemCard = ({ cartItem }: Props) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Card borderRadius="none" padding={4}>
      <Grid
        templateColumns="1fr 0.2fr 0.2fr 0.2fr 0.2fr"
        templateAreas={`"content1 content2 content3 content4 content5"`}
      >
        <GridItem area="content1">
          <Flex alignItems="center">
            <Checkbox colorScheme="orange" />
            <Image src={cartItem.productImage} boxSize="90px" ml="20px" />
            <Text ml="20px">{cartItem.productName}</Text>
          </Flex>
        </GridItem>
        <GridItem area="content2" display="flex" alignItems="center">
          <Text>{formatCurrency(cartItem.inventory.price)}</Text>
        </GridItem>
        <GridItem area="content3" display="flex" alignItems="center">
          <Text>{cartItem.quantity}</Text>
        </GridItem>
        <GridItem area="content4" display="flex" alignItems="center">
          <Text>P300</Text>
        </GridItem>
        <GridItem area="content5" display="flex" alignItems="center">
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
