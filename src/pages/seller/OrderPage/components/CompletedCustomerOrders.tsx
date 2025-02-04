import useGetCustomerOrders from "../hooks/useGetCustomerOrders";
import CustomerOrder from "./CustomerOrder";

const CompletedCustomerOrders = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetCustomerOrders({
    pageSize: 4,
    status: "COMPLETED",
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

export default CompletedCustomerOrders;
