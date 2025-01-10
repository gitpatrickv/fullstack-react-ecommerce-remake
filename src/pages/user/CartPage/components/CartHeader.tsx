import { Card, Checkbox, Flex, Grid, GridItem, Text } from "@chakra-ui/react";

const CartHeader = () => {
  return (
    <Card borderRadius="none" padding={4}>
      <Grid
        templateColumns="1fr 0.2fr 0.2fr 0.2fr 0.2fr"
        templateAreas={`"content1 content2 content3 content4 content5"`}
      >
        <GridItem area="content1">
          <Flex alignItems="center">
            <Checkbox colorScheme="orange" />
            <Text ml="20px" fontWeight="semibold">
              Product
            </Text>
          </Flex>
        </GridItem>
        <GridItem area="content2">
          <Text>Unit Price</Text>
        </GridItem>
        <GridItem area="content3">
          <Text>Quantity</Text>
        </GridItem>
        <GridItem area="content4">
          <Text>Total Price</Text>
        </GridItem>
        <GridItem area="content5">
          <Text>Actions</Text>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default CartHeader;
