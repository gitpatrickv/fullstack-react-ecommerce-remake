import { Box, Card, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { IoIosStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ProductInfoResponse } from "../../entities/Product";
import { formatCurrency } from "../../utilities/formatCurrency";
import noimage from "../../assets/noimage.jpg";

interface Props {
  product: ProductInfoResponse;
}

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const formattedProductName = product.productName
    .toLowerCase()
    .replace(/ /g, "-");
  const handleNavigateClick = () => {
    navigate(`/product/${product.productId}/${formattedProductName}`);
  };
  return (
    <Card cursor="pointer" borderRadius="none" onClick={handleNavigateClick}>
      <Image
        src={product.productImage || noimage}
        width="100%"
        height="100%"
        boxSize="200px"
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
          {formatCurrency(product.price)}
        </Text>
        <Flex alignItems="center" mt="20px">
          <Box color="#FF5722">
            <IoIosStar />
          </Box>
          <Text ml="3px">{product.averageRating ?? 0}</Text>
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
