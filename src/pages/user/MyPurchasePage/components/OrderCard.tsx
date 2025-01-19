import { Button, Card, Flex, Text } from "@chakra-ui/react";
import AlertDialogBox from "../../../../components/AlertDialog/AlertDialogBox";
import OrangeButton from "../../../../components/Button/OrangeButton";
import { Order } from "../../../../entities/Order";
import { formatCurrency } from "../../../../utilities/formatCurrency";
import useUpdateOrderStatus from "../hooks/useUpdateOrderStatus";
import OrderItemCard from "./OrderItemCard";

interface Props {
  order: Order;
}

const OrderCard = ({ order }: Props) => {
  const cardStyle = {
    padding: "16px",
    borderRadius: "none",
    borderColor: "	#E8E8E8",
  };

  const statusMapping: Record<string, string> = {
    TO_PAY: "TO PAY",
    TO_SHIP: "TO SHIP",
    TO_RECEIVE: "TO RECEIVE",
    COMPLETED: "COMPLETED",
    RATED: "RATED",
    CANCELLED: "CANCELLED",
  };

  const buttonNameMapping: Record<string, string> = {
    TO_PAY: "Cancel Order",
    TO_SHIP: "Cancel Order",
    TO_RECEIVE: "Order Received",
    COMPLETED: "Rate",
    RATED: "Buy Again",
    CANCELLED: "Buy Again",
  };

  const {
    mutation: updateOrderStatus,
    isOpen: isOpenUpdateOrderStatus,
    onClose: onCloseUpdateOrderStatus,
    onOpen: onOpenUpdateOrderStatus,
  } = useUpdateOrderStatus({
    orderId: order.orderId,
    status: order.orderStatus === "TO_RECEIVE" ? "COMPLETED" : "CANCELLED",
  });

  const handleUpdateOrderStatusClick = () => {
    updateOrderStatus.mutate();
  };

  return (
    <>
      <Card borderBottom="1px solid" mt="10px" {...cardStyle}>
        <Flex justifyContent="space-between">
          <Text fontWeight="semibold">{order.storeName}</Text>
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
        <Flex justifyContent="end" mt="20px">
          <OrangeButton width="150px" onClick={onOpenUpdateOrderStatus}>
            {buttonNameMapping[order.orderStatus] || ""}
          </OrangeButton>
          {order.orderStatus === "COMPLETED" && (
            <Button
              variant="unstyled"
              width="150px"
              bg="#E8E8E8"
              _hover={{ bg: "#D8D8D8" }}
              _active={{ bg: "#E8E8E8" }}
              borderRadius="none"
              ml="10px"
            >
              Buy Again
            </Button>
          )}
        </Flex>
      </Card>
      <AlertDialogBox
        isOpen={isOpenUpdateOrderStatus}
        onClose={onCloseUpdateOrderStatus}
        title={
          order.orderStatus === "TO_RECEIVE"
            ? "Complete Order"
            : "Order Cancellation"
        }
        content={
          order.orderStatus === "TO_RECEIVE"
            ? "Check that you received all items in satisfactory condition before confirming."
            : "Are you sure you want to cancel your order?"
        }
        buttonName={
          order.orderStatus === "TO_RECEIVE" ? "Confirm" : "Cancel Order"
        }
        color={"#FF5722"}
        hoverColor={"#E64A19"}
        fn={handleUpdateOrderStatusClick}
      />
    </>
  );
};

export default OrderCard;
