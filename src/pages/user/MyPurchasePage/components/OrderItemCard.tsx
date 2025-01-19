import { Card, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { OrderItem } from "../../../../entities/OrderItem";
import { formatCurrency } from "../../../../utilities/formatCurrency";

interface Props {
  items: OrderItem;
}

const OrderItemCard = ({ items }: Props) => {
  return (
    <Card padding={4} borderRadius="none">
      <Flex alignItems="center">
        <Image src={items.productImage} boxSize="90px" cursor="pointer" />
        <Flex flexDirection="column">
          <Text ml="20px" textTransform="capitalize" cursor="pointer">
            {items.productName}
          </Text>
          {items.color && items.size && (
            <Text ml="20px" color="gray.500">
              Variation: {items.color}, {items.size}
            </Text>
          )}
        </Flex>
        <Spacer />
        <Flex flexDirection="column" textAlign="end">
          <Text>Qty: {items.quantity}</Text>
          <Text>{formatCurrency(items.productPrice)}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default OrderItemCard;
