import { Box, Card, Center, Flex, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import OrangeButton from "../../../components/Button/OrangeButton";
import { Inventory } from "../../../entities/Inventory";
import { ProductModels } from "../../../entities/Product";
import useGetOneResource from "../../../hooks/useGetOneResource";
import { formatCurrency } from "../../../utilities/formatCurrency";
import ProductImages from "./components/ProductImages";
import ProductQuantity from "./components/ProductQuantity";
import RatingsAndSold from "./components/RatingsAndSold";
import StoreInfoSection from "./components/StoreInfoSection";
import Variations from "./components/Variations";
import useAddToCart from "./hooks/useAddToCart";
import useAddToCartWithVariation from "./hooks/useAddToCartWithVariation";

const ProductDetailPage = () => {
  const params = useParams<{ productId: string }>();
  const productId = params.productId;

  const { data: getProductDetail } = useGetOneResource<ProductModels>({
    module: "product",
    id: productId!,
  });

  const hasColorsOrSizes = getProductDetail?.inventories.some(
    (inv) => !!inv.color || !!inv.size
  );

  const [count, setCount] = useState<number>(1);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");

  useEffect(() => {
    if (getProductDetail && hasColorsOrSizes) {
      setColor(getProductDetail?.inventories[0].color || "");
      setSize(getProductDetail?.inventories[0].size || "");
    }
  }, [getProductDetail]);

  useEffect(() => {
    if (productId) setCount(1);
  }, [productId, color, size]);

  const { mutate: addToCart } = useAddToCart();

  const handleAddToCartClick = () => {
    addToCart({
      productId: productId!,
      quantity: count,
    });
  };

  const { mutate: addToCartWithVariation } = useAddToCartWithVariation({
    color: color,
    size: size,
  });

  const handleAddToCartWithVariationClick = () => {
    addToCartWithVariation({
      productId: productId!,
      quantity: count,
    });
  };

  const [filteredInventory, setFilteredInventory] = useState<Inventory | null>(
    null
  );

  const filterInventory = (color: string, size: string) => {
    const inventory = getProductDetail?.inventories.find(
      (inv) => inv.color === color && inv.size === size
    );
    setFilteredInventory(inventory || null);
  };

  useEffect(() => {
    filterInventory(color, size);
  }, [color, size]);

  const isOutOfStock =
    (!hasColorsOrSizes &&
      (getProductDetail?.inventories[0]?.quantity ?? 0) < 1) ||
    (hasColorsOrSizes && (filteredInventory?.quantity ?? 0) < 1);

  return (
    <Center mt="10px">
      <Box minWidth="1200px">
        <Card padding={5} borderRadius="none" minHeight="600px">
          <Flex>
            <Stack minWidth="450px" maxWidth="450px">
              <ProductImages images={getProductDetail?.productImages} />
            </Stack>

            <Stack ml="30px">
              <Text
                fontSize="xl"
                fontWeight="semibold"
                isTruncated={true}
                textTransform="capitalize"
                height="30px"
              >
                {getProductDetail?.productName}
              </Text>
              <RatingsAndSold totalSold={getProductDetail?.totalSold ?? 0} />
              <Text fontSize="x-large" fontWeight="semibold" color="#E64A19">
                {filteredInventory
                  ? formatCurrency(filteredInventory?.price ?? 0)
                  : formatCurrency(getProductDetail?.inventories[0].price ?? 0)}
              </Text>
              <Variations
                inventories={getProductDetail?.inventories}
                color={color}
                setColor={setColor}
                size={size}
                setSize={setSize}
                hasColorsOrSizes={hasColorsOrSizes}
              />
              <ProductQuantity
                count={count}
                setCount={setCount}
                filteredInventory={filteredInventory}
                hasColorsOrSizes={hasColorsOrSizes}
                productQuantity={
                  getProductDetail?.inventories[0]?.quantity ?? 0
                }
                isOutOfStock={isOutOfStock}
              />

              <OrangeButton
                width="200px"
                onClick={
                  hasColorsOrSizes
                    ? handleAddToCartWithVariationClick
                    : handleAddToCartClick
                }
                isDisabled={isOutOfStock ? true : false}
              >
                <FiShoppingCart size="25px" />
                <Text ml="10px">Add To Cart</Text>
              </OrangeButton>
            </Stack>
          </Flex>
        </Card>
        <StoreInfoSection store={getProductDetail?.store} />
      </Box>
    </Center>
  );
};

export default ProductDetailPage;
