import { Skeleton, Box, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetAllOrderItems from "../hooks/useGetAllOrderItems";
import NoOrdersYet from "./NoOrdersYet";
import OrderCard from "./OrderCard";

const CompletedOrders = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllOrderItems({
    pageSize: 6,
    status: "COMPLETED",
  });

  const ordersLength =
    data?.pages.flatMap((order) => order.orderModels).length || 0;

  const fetchOrderData =
    data?.pages.reduce((total, page) => total + page.orderModels.length, 0) ||
    0;
  const array = [1, 2, 3, 4, 5];

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

export default CompletedOrders;
