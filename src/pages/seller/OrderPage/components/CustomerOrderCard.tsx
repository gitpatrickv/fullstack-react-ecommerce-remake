import { Card, Flex, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import AlertDialogBox from "../../../../components/AlertDialog/AlertDialogBox";
import OrangeButton from "../../../../components/Button/OrangeButton";
import WhiteButton from "../../../../components/Button/WhiteButton";
import { Order } from "../../../../entities/Order";
import { formatCurrency } from "../../../../utilities/formatCurrency";
import OrderItemCard from "../../../user/MyPurchasePage/components/OrderItemCard";
import useUpdateOrderStatus from "../../../user/MyPurchasePage/hooks/useUpdateOrderStatus";

interface Props {
  order: Order;
}

const CustomerOrderCard = ({ order }: Props) => {
  const cardStyle = {
    padding: "16px",
    borderRadius: "none",
    borderColor: "	#E8E8E8",
  };

  const statusMapping: Record<string, string> = {
    TO_PAY: "TO CONFIRM",
    TO_SHIP: "TO SHIP",
    TO_RECEIVE: "SHIPPED",
    COMPLETED: "COMPLETED",
    RATED: "RATED",
    CANCELLED: "CANCELLED",
  };

  const buttonNameMapping: Record<string, string> = {
    TO_PAY: "Confirm Order",
    TO_SHIP: "Ship Order",
  };
  const [orderStatus, setOrderStatus] = useState("");
  const {
    mutation: updateOrderStatus,
    isOpen,
    onClose,
    onOpen,
  } = useUpdateOrderStatus({
    orderId: order.orderId,
    status: orderStatus,
  });

  const handleOrderStatusClick = (value: string) => {
    setOrderStatus(value);
    updateOrderStatus.mutate();
  };

  const showButton = ["TO_PAY", "TO_SHIP"];

  return (
    <>
      <Card borderBottom="1px solid" mt="10px" {...cardStyle}>
        <Flex justifyContent="space-between" alignItems="center">
          <HStack>
            <Text fontWeight="semibold" textTransform="capitalize">
              {order.recipientName}
            </Text>
            <WhiteButton height="30px" ml="10px">
              User Details
            </WhiteButton>
          </HStack>
          <Text color="#E64A19" fontWeight="semibold">
            {statusMapping[order.orderStatus] || ""}
          </Text>
        </Flex>
      </Card>
      {order.orderItems.map((items) => (
        <OrderItemCard key={items.orderItemId} items={items} />
      ))}
      <Card borderTop="1px solid" {...cardStyle}>
        <Text textAlign="end">
          Order Total:{" "}
          <Text as="span" color="#E64A19" fontWeight="semibold" fontSize="xl">
            {formatCurrency(order.totalAmount)}
          </Text>
        </Text>
        <Flex
          justifyContent="end"
          mt={showButton.includes(order.orderStatus) ? "20px" : "0"}
        >
          {order.orderStatus === "TO_PAY" && (
            <WhiteButton mr="10px" onClick={onOpen}>
              Cancel Order
            </WhiteButton>
          )}
          {showButton.includes(order.orderStatus) && (
            <OrangeButton
              width="150px"
              onClick={() =>
                handleOrderStatusClick(
                  order.orderStatus === "TO_PAY" ? "TO_SHIP" : "TO_RECEIVE"
                )
              }
            >
              {buttonNameMapping[order.orderStatus] || ""}
            </OrangeButton>
          )}
        </Flex>
      </Card>
      <AlertDialogBox
        isOpen={isOpen}
        onClose={onClose}
        title={"Order Cancellation"}
        content={"Are you sure you want to cancel this order?"}
        buttonName={"Cancel Order"}
        color={"#FF5722"}
        hoverColor={"#E64A19"}
        fn={() => handleOrderStatusClick("CANCELLED")}
      />
    </>
  );
};

export default CustomerOrderCard;
