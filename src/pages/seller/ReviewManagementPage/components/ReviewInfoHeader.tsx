import { Card, Grid, GridItem, Text } from "@chakra-ui/react";

const ReviewInfoHeader = () => {
  const centerFlex = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "lg",
    fontWeight: "semibold",
  };

  return (
    <Card borderRadius="none" mt="10px" padding={4}>
      <Grid
        templateColumns="0.2fr 0.6fr 0.2fr"
        templateAreas={`"product review action"`}
      >
        <GridItem area="product" {...centerFlex}>
          <Text>Product</Text>
        </GridItem>
        <GridItem area="review" {...centerFlex}>
          <Text>Customer's Review</Text>
        </GridItem>
        <GridItem area="action" {...centerFlex}>
          <Text>Action</Text>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default ReviewInfoHeader;
