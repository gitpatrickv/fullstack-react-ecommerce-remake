import useGetAllOrderItems from "../hooks/useGetAllOrderItems";
import Orders from "./Orders";

const CancelledOrders = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllOrderItems({
    pageSize: 4,
    status: "CANCELLED",
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

export default CancelledOrders;
