import useGetAllOrderItems from "../hooks/useGetAllOrderItems";
import Orders from "./Orders";

const ToReceiveOrders = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllOrderItems({
    pageSize: 4,
    status: "TO_RECEIVE",
  });

  return (
    <Orders
      data={data}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
};

export default ToReceiveOrders;
