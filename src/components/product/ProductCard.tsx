import { Box, Card, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { IoIosStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ProductModels } from "../../entities/Product";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  product: ProductModels;
}

const ProductCard = ({ product }: Props) => {
  const array = [1, 2, 3, 4, 5];
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate(`/product/${product.productId}/${product.slug}`);
  };
  return (
    <Card cursor="pointer" borderRadius="none" onClick={handleNavigateClick}>
      <Image
        src={product.productImages[0].productImage}
        width="100%"
        height="100%"
        boxSize="210px"
      />
      <Box padding={2}>
        <Text
          fontSize="lg"
          fontWeight="semibold"
          textTransform="capitalize"
          isTruncated={true}
        >
          {product.productName}
        </Text>
        <Text fontSize="md" color="#E64A19" fontWeight="semibold">
          {formatCurrency(product.inventories[0].price)}
        </Text>
        <Flex alignItems="center" mt="20px">
          {array.map((s) => (
            <Box key={s}>
              <IoIosStar />
            </Box>
          ))}
          <Spacer />
          <Text ml="5px" whiteSpace="nowrap">
            {product.totalSold ?? 0} sold
          </Text>
        </Flex>
      </Box>
    </Card>
  );
};

export default ProductCard;
