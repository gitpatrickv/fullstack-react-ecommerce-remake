import { Card, Checkbox, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import useCartStore from "../../../../store/cart-store";

interface Props {
  handleAddRemoveAllIdsChange: () => void;
  cartItemsSize: number;
}
const CartHeader = ({ handleAddRemoveAllIdsChange, cartItemsSize }: Props) => {
  const { itemIds } = useCartStore();
  return (
    <Card borderRadius="none" padding={4}>
      <Grid
        templateColumns="1fr 0.2fr 0.4fr 0.2fr 0.2fr"
        templateAreas={`"content1 content2 content3 content4 content5"`}
      >
        <GridItem area="content1">
          <Flex alignItems="center">
            <Checkbox
              colorScheme="orange"
              isChecked={cartItemsSize === itemIds.size}
              onChange={handleAddRemoveAllIdsChange}
            />
            <Text ml="20px" fontWeight="semibold">
              Product
            </Text>
          </Flex>
        </GridItem>
        <GridItem area="content2">
          <Text textAlign="center">Unit Price</Text>
        </GridItem>
        <GridItem area="content3">
          <Text textAlign="center">Quantity</Text>
        </GridItem>
        <GridItem area="content4">
          <Text textAlign="center"> Total Price</Text>
        </GridItem>
        <GridItem area="content5">
          <Text textAlign="center">Actions</Text>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default CartHeader;
