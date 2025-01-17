import { Text } from "@chakra-ui/react";
import useGetAllOrderItems from "../hooks/useGetAllOrderItems";

const AllOrders = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllOrderItems({
    pageSize: 12,
  });

  return (
    <>
      {data?.pages.map((page) =>
        page.orderModels.map((order) => (
          <Text key={order.orderId}>{order.orderId}</Text>
        ))
      )}
    </>
  );
};

export default AllOrders;
