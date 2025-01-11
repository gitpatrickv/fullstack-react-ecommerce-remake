import { Box, Card, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";

import { ProductModels } from "../../../../entities/Product";
import { formatCurrency } from "../../../../utilities/formatCurrency";
import DeleteModal from "./DeleteButton";
import DelistButton from "./DelistButton";
import UpdateButton from "./UpdateButton";

interface Props {
  product: ProductModels;
}

const ProductsList = ({ product }: Props) => {
  const centerFlex = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Card mb="5px" padding={2} borderRadius="none">
      <Grid
        templateColumns="1fr 200px 200px 200px 200px"
        templateAreas={`
  "content1 content2 content3 content4 content5"
`}
        gap={4}
        p={3}
      >
        <GridItem area="content1" minWidth="400px">
          <Flex alignItems="center">
            <Image
              src={product.productImages[0].productImage}
              width="100px"
              height="80px"
              border="1px solid"
              borderColor="gray.100"
              objectFit="cover"
            />

            <Text
              fontWeight="semibold"
              textTransform="capitalize"
              ml="20px"
              isTruncated={true}
            >
              {product.productName}
            </Text>
          </Flex>
        </GridItem>
        <GridItem area="content2" {...centerFlex}>
          <Box minWidth="60px">
            <Text fontWeight="semibold" textAlign="center">
              {product.totalSold ?? 0}
            </Text>
          </Box>
        </GridItem>
        <GridItem area="content3" {...centerFlex}>
          <Text fontWeight="semibold">
            {formatCurrency(product.inventories[0].price)}
          </Text>
        </GridItem>
        <GridItem area="content4" {...centerFlex}>
          <Text
            fontWeight="semibold"
            color={product.inventories[0].quantity > 0 ? "white.500" : "red"}
          >
            {product.inventories[0].quantity}
          </Text>
        </GridItem>
        <GridItem area="content5" {...centerFlex}>
          <Flex alignItems="center" gap={3}>
            <UpdateButton product={product} />
            <DelistButton
              productId={product.productId}
              status={product.status}
            />
            <DeleteModal
              productId={product.productId}
              productName={product.productName}
            />
          </Flex>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default ProductsList;
