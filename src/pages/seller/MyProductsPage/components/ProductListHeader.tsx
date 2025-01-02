import { Card, Grid, GridItem, Text } from "@chakra-ui/react";

const ProductListHeader = () => {
  const textStyles = {
    fontSize: "xl",
    fontWeight: "semibold",
    color: "#FF5722",
  };

  return (
    <Card borderRadius="none" mb="5px" mt="5px" p={5}>
      <Grid
        templateColumns="1fr 200px 200px 200px 200px"
        templateAreas={`
"content1 content2 content3 content4 content5"
`}
      >
        <GridItem area="content1">
          <Text {...textStyles}>Product Name</Text>
        </GridItem>
        <GridItem ml="30px">
          <Text {...textStyles}>Sold</Text>
        </GridItem>
        <GridItem ml="40px">
          <Text {...textStyles}>Price</Text>
        </GridItem>
        <GridItem ml="60px">
          <Text {...textStyles}>Stock</Text>
        </GridItem>
        <GridItem>
          <Text {...textStyles} textAlign="center">
            Action
          </Text>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default ProductListHeader;
