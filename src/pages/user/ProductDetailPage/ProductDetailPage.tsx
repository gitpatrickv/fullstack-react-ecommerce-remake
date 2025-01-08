import {
  Card,
  Center,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiMinus, FiShoppingCart } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useParams } from "react-router-dom";
import OrangeButton from "../../../components/Button/OrangeButton";
import { ProductModels } from "../../../entities/Product";
import useGetOneResource from "../../../hooks/useGetOneResource";
import { formatCurrency } from "../../../utilities/formatCurrency";
import ProductImages from "./components/ProductImages";
import RatingsAndSold from "./components/RatingsAndSold";
import Variations from "./components/Variations";
import useAddToCart from "./hooks/useAddToCart";

const ProductDetailPage = () => {
  const boxStyle = {
    height: "30px",
    width: "30px",
    borderColor: "#E0E0E0",
    cursor: "pointer",
  };
  const [count, setCount] = useState<number>(1);
  const params = useParams<{ productId: string }>();
  const productId = params.productId;
  const { mutate: addToCart } = useAddToCart();
  const { data: getProductDetail } = useGetOneResource<ProductModels>({
    module: "product",
    id: productId!,
  });

  const handleAddToCartClick = () => {
    addToCart({
      productId: productId!,
      quantity: count,
    });
  };

  useEffect(() => {
    if (productId) setCount(1);
  }, [productId]);

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
              <Flex mt="10px" mb="10px" alignItems="center" userSelect="none">
                <Text mr="62px" fontSize="lg" fontWeight="semibold">
                  Quantity
                </Text>
                <Center
                  border="1px solid"
                  {...boxStyle}
                  onClick={() => setCount(count - 1)}
                >
                  <FiMinus />
                </Center>
                <Center
                  borderY="1px solid"
                  {...boxStyle}
                  width="60px"
                  color="#E64A19"
                >
                  <Text>{count}</Text>
                </Center>
                <Center
                  border="1px solid"
                  {...boxStyle}
                  onClick={() => setCount(count + 1)}
                >
                  <GoPlus />
                </Center>
              </Flex>
              <OrangeButton width="200px" onClick={handleAddToCartClick}>
                <FiShoppingCart size="25px" />
                <Text ml="10px">Add To Cart</Text>
              </OrangeButton>
            </Stack>
          </Flex>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default ProductDetailPage;
