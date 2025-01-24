import useGetAllOrderItems from "../hooks/useGetAllOrderItems";
import Orders from "./Orders";

const AllOrders = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllOrderItems({
    pageSize: 4,
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

export default AllOrders;
