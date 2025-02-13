import useGetCustomerOrders from "../hooks/useGetCustomerOrders";
import CustomerOrder from "./CustomerOrder";

const ShippingCustomerOrders = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetCustomerOrders({
    pageSize: 4,
    status: "TO_RECEIVE",
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

export default ShippingCustomerOrders;
