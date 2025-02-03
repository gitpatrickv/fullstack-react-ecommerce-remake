import { Box, Card, Flex, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import WhiteButton from "../../../../components/Button/WhiteButton";
import StarRating from "../../../../components/product/StarRating";
import useGetProductRatingStarCount from "../hooks/useGetProductRatingStarCount";
import UserReview from "./UserReview";

interface Props {
  averageRating: number;
}

const ProductRatings = ({ averageRating }: Props) => {
  const params = useParams<{ productId: string }>();
  const productId = params.productId;
  const { data: getRatingCount } = useGetProductRatingStarCount(productId!);

  const ratingCount: Record<number, number> = {
    5: getRatingCount?.star5 ?? 0,
    4: getRatingCount?.star4 ?? 0,
    3: getRatingCount?.star3 ?? 0,
    2: getRatingCount?.star2 ?? 0,
    1: getRatingCount?.star1 ?? 0,
  };

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
                {averageRating}
              </Text>
              <Text fontSize="x-large">out of 5</Text>
            </Flex>
            <Flex>
              <StarRating averageRating={averageRating} size="25px" />
            </Flex>
          </Box>
          <Flex mt="5px">
            <WhiteButton mr="10px">All</WhiteButton>
            {ratings.map((rating) => (
              <WhiteButton mr="10px" key={rating}>
                <Text>
                  {rating} Star ({ratingCount[rating]})
                </Text>
              </WhiteButton>
            ))}
          </Flex>
        </Flex>
      </Card>
      <UserReview />
    </Card>
  );
};

export default ProductRatings;
