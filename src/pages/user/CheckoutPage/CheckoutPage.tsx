import { Box, Card, Center, Flex, Text } from "@chakra-ui/react";
import useCartStore from "../../../store/cart-store";
import AddressCard from "./component/AddressCard";
import CheckoutHeader from "./component/CheckoutHeader";
import CheckoutItemCard from "./component/CheckoutItemCard";
import OrderSummary from "./component/OrderSummary";
import useGetAllCheckoutCartItems from "./hooks/useGetAllCheckoutCartItems";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CheckoutPage = () => {
  const { itemIds } = useCartStore();
  const navigate = useNavigate();
  const { data: checkoutItems } = useGetAllCheckoutCartItems({
    ids: Array.from(itemIds) ?? 0,
  });

  useEffect(() => {
    if (itemIds.size < 1) navigate("/cart");
  }, [itemIds]);

  return (
    <Center mt="10px">
      <Box minWidth="1200px">
        <Flex>
          <Box width="100%" mr="10px">
            <AddressCard />
            <CheckoutHeader />
            {checkoutItems?.cartItemsResponse.map((storeName) => (
              <Box mt="10px" key={storeName.storeName}>
                <Card
                  borderRadius="none"
                  borderBottom="1px solid"
                  borderColor="	#E8E8E8"
                  padding={5}
                >
                  <Text fontWeight="semibold" textTransform="capitalize">
                    {storeName.storeName}
                  </Text>
                </Card>
                {storeName.cartItems.map((cartItem) => (
                  <CheckoutItemCard
                    key={cartItem.cartItemId}
                    cartItem={cartItem}
                  />
                ))}
              </Box>
            ))}
          </Box>
          <OrderSummary
            totalAmount={checkoutItems?.totalAmount ?? 0}
            totalItems={checkoutItems?.totalItems ?? 0}
          />
        </Flex>
      </Box>
    </Center>
  );
};

export default CheckoutPage;
