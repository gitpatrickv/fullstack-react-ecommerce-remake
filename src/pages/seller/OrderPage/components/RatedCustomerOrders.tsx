import useGetCustomerOrders from "../hooks/useGetCustomerOrders";
import CustomerOrder from "./CustomerOrder";

const RatedCustomerOrders = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetCustomerOrders({
    pageSize: 4,
    status: "RATED",
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

export default RatedCustomerOrders;
