import { Card, Flex, Text } from "@chakra-ui/react";
import { Order } from "../../../../entities/Order";
import { formatCurrency } from "../../../../utilities/formatCurrency";
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
      </Card>
    </>
  );
};

export default OrderCard;
