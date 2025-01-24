import useGetAllOrderItems from "../hooks/useGetAllOrderItems";
import Orders from "./Orders";

const CompletedOrders = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllOrderItems({
    pageSize: 4,
    status: "COMPLETED",
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

export default CompletedOrders;
