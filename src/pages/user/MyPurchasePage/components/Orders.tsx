import { Box, Skeleton, Spinner } from "@chakra-ui/react";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import OrderItemResponse from "../../../../entities/Order";
import NoOrdersYet from "./NoOrdersYet";
import OrderCard from "./OrderCard";

interface Props {
  data: InfiniteData<OrderItemResponse> | undefined;
  isLoading: boolean;
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<InfiniteData<OrderItemResponse>, Error>
  >;
  hasNextPage: boolean | undefined;
}

const Orders = ({ data, isLoading, fetchNextPage, hasNextPage }: Props) => {
  const ordersLength =
    data?.pages.flatMap((order) => order.orderModels).length || 0;

  const fetchOrderData =
    data?.pages.reduce((total, page) => total + page.orderModels.length, 0) ||
    0;
  const array = [1, 2, 3];

  if (isLoading) {
    return (
      <>
        {array.map((skel) => (
          <Skeleton key={skel} height="200px" mt="10px" />
        ))}
      </>
    );
  }

  if (ordersLength < 1) {
    return <NoOrdersYet />;
  }

  return (
    <Box>
      <InfiniteScroll
        dataLength={fetchOrderData}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Spinner />}
      >
        {data?.pages.map((page) =>
          page.orderModels.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))
        )}
      </InfiniteScroll>
    </Box>
  );
};

export default Orders;
