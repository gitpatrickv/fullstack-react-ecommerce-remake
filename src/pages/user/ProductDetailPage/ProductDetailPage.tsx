import { Card, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ProductModels } from "../../../entities/Product";
import useGetOne from "../../../hooks/useGetOne";
import { formatCurrency } from "../../../utilities/formatCurrency";
import ProductImages from "./components/ProductImages";
import RatingsAndSold from "./components/RatingsAndSold";
import Variations from "./components/Variations";

const ProductDetailPage = () => {
  const params = useParams<{ productId: string }>();
  const productId = params.productId;
  const { data: getProductDetail } = useGetOne<ProductModels>({
    module: "product",
    id: productId!,
  });

  return (
    <Grid
      templateColumns="0.3fr 1fr 0.3fr"
      templateAreas={"'asideLeft content1 asideRight'"}
      mt="10px"
    >
      <GridItem area="content1">
        <Card padding={5} borderRadius="none">
          <Flex>
            <Stack minWidth="450px" maxWidth="450px">
              <ProductImages images={getProductDetail?.productImages} />
            </Stack>

            <Stack ml="30px">
              <Text fontSize="xl" fontWeight="semibold" isTruncated={true}>
                {getProductDetail?.productName}
              </Text>
              <RatingsAndSold />
              <Text fontSize="x-large" fontWeight="semibold" color="#E64A19">
                {formatCurrency(getProductDetail?.inventories[0].price ?? 0)}
              </Text>
              <Variations inventories={getProductDetail?.inventories} />
            </Stack>
          </Flex>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default ProductDetailPage;
