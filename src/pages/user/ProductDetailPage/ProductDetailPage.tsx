import {
  Button,
  Card,
  Center,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiMinus, FiShoppingCart } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
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

  const boxStyle = {
    height: "30px",
    width: "30px",
    borderColor: "#E0E0E0",
    cursor: "pointer",
  };

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
              <Flex mt="10px" mb="10px" alignItems="center">
                <Text mr="62px" fontSize="lg" fontWeight="semibold">
                  Quantity
                </Text>
                <Center border="1px solid" {...boxStyle}>
                  <FiMinus />
                </Center>
                <Center
                  borderY="1px solid"
                  {...boxStyle}
                  width="60px"
                  color="#E64A19"
                >
                  <Text>1</Text>
                </Center>
                <Center border="1px solid" {...boxStyle}>
                  <GoPlus />
                </Center>
              </Flex>

              <Button
                bg="#FF5722"
                _hover={{ bg: "#E64A19" }}
                color="white"
                width="200px"
                borderRadius="none"
              >
                <FiShoppingCart size="25px" />
                <Text ml="10px">Add To Cart</Text>
              </Button>
            </Stack>
          </Flex>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default ProductDetailPage;
