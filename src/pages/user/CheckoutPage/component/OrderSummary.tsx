import {
  Box,
  Card,
  Checkbox,
  Divider,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { ImCreditCard } from "react-icons/im";
import { LiaMoneyBillAlt } from "react-icons/lia";
import OrangeButton from "../../../../components/Button/OrangeButton";
import useCartStore from "../../../../store/cart-store";
import { formatCurrency } from "../../../../utilities/formatCurrency";
import useGetCartTotal from "../hooks/useGetCartTotal";

const OrderSummary = () => {
  const boxStyle = {
    border: "1px solid",
    borderColor: "#E8E8E8",
    borderRadius: "4px",
    mt: "10px",
    _hover: { borderColor: "#E64A19" },
    cursor: "pointer",
  };

  const { itemIds } = useCartStore();
  const { data: getCartTotal } = useGetCartTotal({
    ids: Array.from(itemIds) ?? 0,
  });

  return (
    <Card padding={5} minWidth="400px" borderRadius="none" maxHeight="500px">
      <Text fontSize="xl" fontWeight="semibold">
        Select payment method
      </Text>
      <Box {...boxStyle}>
        <Flex alignItems="center" padding={2}>
          <LiaMoneyBillAlt size="25px" />
          <Text mb="1px" ml="10px">
            Cash on Delivery
          </Text>
          <Spacer />
          <Checkbox colorScheme="orange" />
        </Flex>
        <Text fontSize="sm" padding={2}>
          Pay when you received
        </Text>
      </Box>
      <Box {...boxStyle}>
        <Flex alignItems="center" padding={2}>
          <ImCreditCard size="25px" />
          <Text mb="1px" ml="10px">
            Stripe Payment
          </Text>
          <Spacer />
          <Checkbox colorScheme="orange" />
        </Flex>
        <Text fontSize="sm" padding={2}>
          Securely pay with Stripe
        </Text>
      </Box>
      <Text fontSize="xl" fontWeight="semibold" mt="20px">
        Order Summary
      </Text>
      <Flex justifyContent="space-between" mt="10px">
        <Text color="gray.500">
          Subtotal ({getCartTotal?.totalItems ?? 0} items)
        </Text>
        <Text>{formatCurrency(getCartTotal?.totalAmount ?? 0)}</Text>
      </Flex>
      <Flex justifyContent="space-between" mt="10px">
        <Text color="gray.500">Shipping Fee</Text>
        <Text>{formatCurrency(100)}</Text>
      </Flex>
      <Divider borderColor="#E8E8E8" mt="10px" mb="10px" />
      <Flex justifyContent="space-between">
        <Text fontWeight="semibold" fontSize="xl">
          Total
        </Text>
        <Text color="#E64A19" fontWeight="semibold" fontSize="xl">
          {formatCurrency(getCartTotal?.totalAmount ?? 0)}
        </Text>
      </Flex>
      <OrangeButton mt="30px">Place Order</OrangeButton>
    </Card>
  );
};

export default OrderSummary;
