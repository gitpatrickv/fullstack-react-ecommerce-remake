import { Card, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { formatCurrency } from "../../../../utilities/formatCurrency";

const CheckoutItemCard = () => {
  const centerFlex = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <Card borderRadius="none" padding={5}>
      <Grid
        templateColumns="1fr 0.3fr 0.3fr 0.2fr"
        templateAreas={`"content1 content2 content3 content4"`}
      >
        <GridItem area="content1">
          <Flex alignItems="center">
            <Image
              src={
                "https://t4.ftcdn.net/jpg/05/49/86/39/360_F_549863991_6yPKI08MG7JiZX83tMHlhDtd6XLFAMce.jpg"
              }
              boxSize="50px"
            />
            <Flex flexDirection="column">
              <Text
                ml="10px"
                textTransform="capitalize"
                maxWidth="300px"
                isTruncated={true}
              >
                product name asdf asdf asdf asdf asdf asdf asdf asdf
              </Text>
              {/* {cartItem.inventory.color && cartItem.inventory.size && (
                <Text ml="20px" color="gray.500">
                  Variation: {cartItem.inventory.color},{" "}
                  {cartItem.inventory.size}
                </Text>
              )} */}
            </Flex>
          </Flex>
        </GridItem>
        <GridItem area="content2" {...centerFlex}>
          <Text>{formatCurrency(1233)}</Text>
        </GridItem>
        <GridItem area="content3" {...centerFlex} userSelect="none">
          <Text>1</Text>
        </GridItem>
        <GridItem area="content4" {...centerFlex} justifyContent="end">
          <Text color="#E64A19" fontWeight="semibold">
            {formatCurrency(1000)}
          </Text>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default CheckoutItemCard;
