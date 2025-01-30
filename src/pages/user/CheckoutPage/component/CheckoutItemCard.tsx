import { Card, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { CartItem } from "../../../../entities/CartItem";
import { formatCurrency } from "../../../../utilities/formatCurrency";

interface Props {
  cartItem: CartItem;
}

const CheckoutItemCard = ({ cartItem }: Props) => {
  const centerFlex = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const totalItemPrice = cartItem.inventory.price * cartItem.quantity;
  return (
    <Card borderRadius="none" padding={5}>
      <Grid
        templateColumns="1fr 0.3fr 0.3fr 0.2fr"
        templateAreas={`"content1 content2 content3 content4"`}
      >
        <GridItem area="content1">
          <Flex alignItems="center">
            <Image
              src={cartItem.productImage}
              boxSize="50px"
              objectFit="cover"
            />
            <Flex flexDirection="column">
              <Text
                ml="10px"
                textTransform="capitalize"
                maxWidth="300px"
                isTruncated={true}
              >
                {cartItem.productName}
              </Text>
              {cartItem.inventory.color && cartItem.inventory.size && (
                <Text ml="10px" color="gray.500">
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
          <Text>{cartItem.quantity}</Text>
        </GridItem>
        <GridItem area="content4" {...centerFlex} justifyContent="end">
          <Text color="#E64A19" fontWeight="semibold">
            {formatCurrency(totalItemPrice)}
          </Text>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default CheckoutItemCard;
