import { Card, Grid, GridItem, Text } from "@chakra-ui/react";

const CheckoutHeader = () => {
  return (
    <Card borderRadius="none" padding={5}>
      <Grid
        templateColumns="1fr 0.3fr 0.3fr 0.2fr"
        templateAreas={`"content1 content2 content3 content4"`}
      >
        <GridItem area="content1">
          <Text fontWeight="semibold">Products Ordered</Text>
        </GridItem>
        <GridItem area="content2">
          <Text textAlign="center">Unit Price</Text>
        </GridItem>
        <GridItem area="content3">
          <Text textAlign="center">Quantity</Text>
        </GridItem>
        <GridItem area="content4">
          <Text textAlign="end"> Total Price</Text>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default CheckoutHeader;
