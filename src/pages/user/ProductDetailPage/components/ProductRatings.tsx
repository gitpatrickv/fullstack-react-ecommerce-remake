import { Box, Card, Flex, Text } from "@chakra-ui/react";
import { IoIosStar } from "react-icons/io";
import WhiteButton from "../../../../components/Button/WhiteButton";

const ProductRatings = () => {
  const ratings = [5, 4, 3, 2, 1];
  return (
    <Card padding={5} mt="10px" borderRadius="none" height="600px">
      <Text fontSize="x-large" fontWeight="semibold" mb="10px">
        Product Rating
      </Text>
      <Card padding={5} borderRadius="none" bg="#F8F8F8" boxShadow="none">
        <Flex>
          <Box>
            <Flex alignItems="center" mr="30px" color="#E64A19">
              <Text fontSize="xx-large" mr="5px">
                4.8
              </Text>
              <Text fontSize="x-large">out of 5</Text>
            </Flex>
            <IoIosStar size="25px" />
          </Box>
          <Flex mt="5px">
            <WhiteButton mr="10px">All</WhiteButton>
            {ratings.map((rating) => (
              <WhiteButton mr="10px" key={rating}>
                <Text>{rating} star (199)</Text>
              </WhiteButton>
            ))}
          </Flex>
        </Flex>
      </Card>
    </Card>
  );
};

export default ProductRatings;
