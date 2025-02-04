import { Skeleton, Spinner } from "@chakra-ui/react";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import OrderItemResponse from "../../../../entities/Order";
import NoOrdersYet from "../../../user/MyPurchasePage/components/NoOrdersYet";
import CustomerOrderCard from "./CustomerOrderCard";

interface Props {
  data: InfiniteData<OrderItemResponse> | undefined;
  isLoading: boolean;
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<InfiniteData<OrderItemResponse>, Error>
  >;
  hasNextPage: boolean | undefined;
}

const CustomerOrder = ({
  data,
  isLoading,
  fetchNextPage,
  hasNextPage,
}: Props) => {
  const ordersLength = data?.pages.flatMap((order) => order.models).length || 0;

  const fetchOrderData =
    data?.pages.reduce((total, page) => total + page.models.length, 0) || 0;

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

  if (data && ordersLength < 1) {
    return <NoOrdersYet />;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={fetchOrderData}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Spinner />}
      >
        {data?.pages.map((page) =>
          page.models.map((order) => (
            <CustomerOrderCard key={order.orderId} order={order} />
          ))
        )}
      </InfiniteScroll>
    </>
  );
};

export default CustomerOrder;
