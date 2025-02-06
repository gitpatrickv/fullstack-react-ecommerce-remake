import { Card, Flex, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useShopStore } from "../../../store/shop-store";
import ManageReviewList from "./components/ManageReviewList";
import ReviewInfoHeader from "./components/ReviewInfoHeader";
import ReviewSortingHeader from "./components/ReviewSortingHeader";
import useGetProductReviewsByStore from "./hooks/useGetProductReviewsByStore";

const ReviewManagementPage = () => {
  const { storeId } = useShopStore();
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const {
    data: getReviews,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useGetProductReviewsByStore({
    sortBy: sortBy,
    sortDirection: sortDirection,
    pageSize: 10,
    storeId: storeId ?? 0,
  });

  const fetchReviewData =
    getReviews?.pages.reduce((total, page) => total + page.models.length, 0) ||
    0;

  const reviewLength =
    getReviews?.pages.flatMap((review) => review.models).length || 0;

  return (
    <>
      <Card padding={4} borderRadius="none">
        <Flex alignItems="center">
          <Text fontSize="xl" fontWeight="semibold">
            Store Rating
          </Text>
          <Text ml="5px">4.5/5</Text>
        </Flex>
      </Card>
      <ReviewSortingHeader sortBy={sortBy} sortDirection={sortDirection} />
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
