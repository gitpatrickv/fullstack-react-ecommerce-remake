import { Box, Card, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import WhiteButton from "../../../../components/Button/WhiteButton";
import StarRating from "../../../../components/product/StarRating";
import useGetProductRatingStarCount from "../hooks/useGetProductRatingStarCount";
import useGetProductReviews from "../hooks/useGetProductReviews";
import NoRatingsYet from "./NoRatingsYet";
import UserReview from "./UserReview";

interface Props {
  averageRating: number;
}

const ProductRatingsAndReview = ({ averageRating }: Props) => {
  const ratings = [5, 4, 3, 2, 1];
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

  const [rating, setRating] = useState<number | null>(null);
  const {
    data: getReviews,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useGetProductReviews({
    productId: productId!,
    rating: rating,
    pageSize: 10,
  });

  const fetchReviewData =
    getReviews?.pages.reduce((total, page) => total + page.models.length, 0) ||
    0;

  const reviewLength =
    getReviews?.pages.flatMap((review) => review.models).length || 0;

  return (
    <Card padding={5} mt="10px" borderRadius="none" mb="40px">
      <Text fontSize="x-large" fontWeight="semibold" mb="10px">
        Product Rating
      </Text>
      <Card
        padding={5}
        borderRadius="none"
        bg="#F8F8F8"
        boxShadow="none"
        mb="5px"
      >
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
            <WhiteButton
              mr="10px"
              _hover={{ bg: "white" }}
              _active={{ bg: "white" }}
              onClick={() => setRating(null)}
              borderColor={rating === null ? "#E64A19" : "#E8E8E8"}
              color={rating === null ? "#E64A19" : "black"}
            >
              All
            </WhiteButton>
            {ratings.map((rate) => (
              <WhiteButton
                mr="10px"
                _hover={{ bg: "white" }}
                _active={{ bg: "white" }}
                key={rate}
                onClick={() => setRating(rate)}
                borderColor={rate === rating ? "#E64A19" : "#E8E8E8"}
              >
                <Text color={rate === rating ? "#E64A19" : "black"}>
                  {rate} Star ({ratingCount[rate]})
                </Text>
              </WhiteButton>
            ))}
          </Flex>
        </Flex>
      </Card>
      {isLoading && (
        <Center height="600px">
          <Spinner />
        </Center>
      )}
      {reviewLength < 1 && !isLoading && <NoRatingsYet />}
      {reviewLength >= 1 && (
        <InfiniteScroll
          dataLength={fetchReviewData}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<Spinner />}
        >
          {getReviews?.pages.map((page) =>
            page.models.map((review) => (
              <UserReview key={review.productReviewId} productReview={review} />
            ))
          )}
        </InfiniteScroll>
      )}
    </Card>
  );
};

export default ProductRatingsAndReview;
