import useGetCustomerOrders from "../hooks/useGetCustomerOrders";
import CustomerOrder from "./CustomerOrder";

const ToShipCustomerOrders = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetCustomerOrders({
    pageSize: 4,
    status: "TO_SHIP",
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

export default ToShipCustomerOrders;
