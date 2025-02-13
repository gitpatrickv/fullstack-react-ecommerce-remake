import useGetCustomerOrders from "../hooks/useGetCustomerOrders";
import CustomerOrder from "./CustomerOrder";

const AllCustomerOrders = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetCustomerOrders({
    pageSize: 4,
  });

  return (
    <>
      <CustomerOrder
        data={data}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </>
  );
};

export default AllCustomerOrders;
