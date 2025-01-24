import useGetAllOrderItems from "../hooks/useGetAllOrderItems";
import Orders from "./Orders";

const RatedOrders = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllOrderItems({
    pageSize: 4,
    status: "RATED",
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

export default RatedOrders;
