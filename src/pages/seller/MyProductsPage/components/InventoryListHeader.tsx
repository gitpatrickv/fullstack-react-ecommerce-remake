import { Grid, GridItem, Text } from "@chakra-ui/react";

const InventoryListHeader = () => {
  const textStyles = {
    fontSize: "md",
    fontWeight: "semibold",
    color: "#E64A19",
  };
  return (
    <>
      <Grid
        templateColumns="0.2fr 0.2fr 0.2fr 0.2fr 0.2fr"
        templateAreas={`"content1 content2 content3 content4 content5"`}
        mb="5px"
      >
        <GridItem area="content1">
          <Text {...textStyles} textAlign="center">
            Qty.
          </Text>
        </GridItem>
        <GridItem area="content2">
          <Text {...textStyles} textAlign="center">
            Price
          </Text>
        </GridItem>
        <GridItem area="content3">
          <Text {...textStyles} textAlign="center">
            Variants
          </Text>
        </GridItem>
        <GridItem area="content4">
          <Text {...textStyles} textAlign="center">
            Size
          </Text>
        </GridItem>
        <GridItem area="content5">
          <Text {...textStyles} textAlign="center">
            Action
          </Text>
        </GridItem>
      </Grid>
    </>
  );
};

export default InventoryListHeader;
