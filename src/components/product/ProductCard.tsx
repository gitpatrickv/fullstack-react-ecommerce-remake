import { Box, Card, Center, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { IoIosStar } from "react-icons/io";
import { ProductModels } from "../../entities/Product";
import { useNavigate } from "react-router-dom";

interface Props {
  product: ProductModels;
}

const ProductCard = ({ product }: Props) => {
  const array = [1, 2, 3, 4, 5];
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate(`/product/${product.productId}`);
  };
  return (
    <Center mt="20px">
      <Card cursor="pointer" borderRadius="none" onClick={handleNavigateClick}>
        <Image
          src={
            "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
          }
          h={[150, 200]}
        />
        <Box padding={2}>
          <Text
            fontSize="large"
            fontWeight="semibold"
            textTransform="capitalize"
            isTruncated={true}
          >
            {product.productName}
          </Text>
          <Text fontSize="md">P123.00</Text>
          <Flex alignItems="center" mt="20px">
            {array.map((s) => (
              <Box key={s}>
                <IoIosStar />
              </Box>
            ))}
            {/* {rating?.ratingAverage === 0 ||
          rating?.overallTotalUserRating === 0 ? (
            <Box></Box>
          ) : (
            <Box display="flex" alignItems="center" whiteSpace="nowrap">
              {ratings.map((rate) => (
                <Box
                  as={IoIosStar}
                  color={rate <= ratingAvg ? "orange.400" : "gray.600"}
                  key={rate}
                />
              ))}

              <Text ml={1} fontSize="sm">
                {rating?.ratingAverage || 0} ({rating?.overallTotalUserRating})
              </Text>
            </Box>
          )} */}
            <Spacer />
            <Text ml="5px" whiteSpace="nowrap">
              0 sold
            </Text>
          </Flex>
        </Box>
      </Card>
    </Center>
  );
};

export default ProductCard;
