import { Card, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import StarRating from "../../../components/product/StarRating";
import { useShopStore } from "../../../store/shop-store";
import NoRatingsYet from "../../user/ProductDetailPage/components/NoRatingsYet";
import ManageReviewList from "./components/ManageReviewList";
import ReviewInfoHeader from "./components/ReviewInfoHeader";
import ReviewSortingHeader from "./components/ReviewSortingHeader";
import useGetProductReviewsByStore from "./hooks/useGetProductReviewsByStore";

const ReviewManagementPage = () => {
  const { averageRating } = useShopStore();
  const [sortBy, setSortBy] = useState("createdDate");
  const [sortDirection, setSortDirection] = useState("DESC");
  const {
    data: getReviews,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useGetProductReviewsByStore({
    sortBy: sortBy,
    sortDirection: sortDirection,
    pageSize: 5,
  });

  const fetchReviewData =
    getReviews?.pages.reduce((total, page) => total + page.models.length, 0) ||
    0;

  const reviewLength =
    getReviews?.pages.flatMap((review) => review.models).length || 0;

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner />
      </Center>
    );
  }

  if (getReviews && reviewLength < 1) {
    return (
      <Center height="90vh">
        <NoRatingsYet />
      </Center>
    );
  }

  return (
    <>
      <Card padding={4} borderRadius="none">
        <Flex alignItems="center">
          <Text fontSize="xl" fontWeight="semibold" mr="10px">
            Store Rating
          </Text>
          <StarRating averageRating={averageRating ?? 0} size="25px" />
          <Flex alignItems="center" mr="30px" color="#E64A19">
            <Text fontSize="xl" mr="5px" ml="10px">
              {averageRating ?? 0}
            </Text>
            <Text fontSize="lg">out of 5</Text>
          </Flex>
        </Flex>
      </Card>
      <ReviewSortingHeader
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      <ReviewInfoHeader />
      <InfiniteScroll
        dataLength={fetchReviewData}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Spinner />}
      >
        {getReviews?.pages.map((page) =>
          page.models.map((review) => (
            <ManageReviewList key={review.productReviewId} review={review} />
          ))
        )}
      </InfiniteScroll>
    </>
  );
};

export default ReviewManagementPage;
