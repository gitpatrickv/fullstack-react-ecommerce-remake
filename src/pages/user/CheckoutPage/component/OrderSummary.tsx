import {
  Box,
  Card,
  Checkbox,
  Divider,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { ImCreditCard } from "react-icons/im";
import { LiaMoneyBillAlt } from "react-icons/lia";
import OrangeButton from "../../../../components/Button/OrangeButton";
import useCartStore from "../../../../store/cart-store";
import { formatCurrency } from "../../../../utilities/formatCurrency";
import useGetCartTotal from "../hooks/useGetCartTotal";
import usePlaceOrder from "../hooks/usePlaceOrder";
import { useAddressStore } from "../../../../store/address-store";
import { useUserStore } from "../../../../store/user-store";

interface Props {
  hasActiveAddress: boolean;
}

const OrderSummary = ({ hasActiveAddress }: Props) => {
  const { cartId } = useUserStore();
  const boxStyle = {
    border: "1px solid",
    borderRadius: "4px",
    mt: "10px",
    _hover: { borderColor: "#E64A19" },
    cursor: "pointer",
  };
  const { onOpen } = useAddressStore();
  const { itemIds } = useCartStore();
  const cartItemIds = Array.from(itemIds) ?? 0;

  const { data: getCartTotal } = useGetCartTotal({
    ids: cartItemIds,
    cartId: cartId ?? 0,
  });
  const [paymentMethod, setPaymentMethod] =
    useState<string>("CASH_ON_DELIVERY");

  const { mutate: placeOrder, isPending } = usePlaceOrder();

  const handlePlaceOrderClick = () => {
    placeOrder({
      ids: cartItemIds,
      paymentMethod: paymentMethod,
    });
  };

  const isCashOnDelivery = paymentMethod === "CASH_ON_DELIVERY";
  const isStripePayment = paymentMethod === "STRIPE_PAYMENT";

  return (
    <Card padding={5} minWidth="400px" borderRadius="none" maxHeight="500px">
      <Text fontSize="xl" fontWeight="semibold">
        Select payment method
      </Text>

      <Box
        {...boxStyle}
        onClick={() => setPaymentMethod("CASH_ON_DELIVERY")}
        borderColor={isCashOnDelivery ? "#E64A19" : "#E8E8E8"}
      >
        <Flex
          alignItems="center"
          padding={2}
          bg={isCashOnDelivery ? "rgba(230, 74, 25, 0.1)" : "#F8F8F8"}
          overflow="hidden"
        >
          <LiaMoneyBillAlt size="25px" />
          <Text mb="1px" ml="10px">
            Cash on Delivery
          </Text>
          <Spacer />
          <Checkbox colorScheme="orange" isChecked={isCashOnDelivery} />
        </Flex>
        <Text fontSize="sm" padding={2}>
          Pay when you received
        </Text>
      </Box>

      <Box
        {...boxStyle}
        onClick={() => setPaymentMethod("STRIPE_PAYMENT")}
        borderColor={isStripePayment ? "#E64A19" : "#E8E8E8"}
      >
        <Flex
          alignItems="center"
          padding={2}
          bg={isStripePayment ? "rgba(230, 74, 25, 0.1)" : "#F8F8F8"}
          overflow="hidden"
        >
          <ImCreditCard size="25px" />
          <Text mb="1px" ml="10px">
            Stripe Payment
          </Text>
          <Spacer />
          <Checkbox colorScheme="orange" isChecked={isStripePayment} />
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
      <OrangeButton
        mt="30px"
        onClick={hasActiveAddress ? handlePlaceOrderClick : onOpen}
        isLoading={isPending}
      >
        Place Order
      </OrangeButton>
    </Card>
  );
};

export default OrderSummary;
