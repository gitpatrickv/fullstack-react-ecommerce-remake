import useGetAllOrderItems from "../hooks/useGetAllOrderItems";
import Orders from "./Orders";

const ToShipOrders = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllOrderItems({
    pageSize: 6,
    status: "TO_SHIP",
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

export default ToShipOrders;
