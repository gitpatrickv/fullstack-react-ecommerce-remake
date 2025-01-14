import { Box, Card, Center, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetAllAddressResponse from "../../../entities/Address";
import useGetAllResources from "../../../hooks/useGetAllResources";
import useCartStore from "../../../store/cart-store";
import useGetCartItemsGroupedByStore from "../CartPage/hooks/useGetCartItemsGroupedByStore";
import ActiveAddress from "./component/ActiveAddress";
import CheckoutHeader from "./component/CheckoutHeader";
import CheckoutItemCard from "./component/CheckoutItemCard";
import OrderSummary from "./component/OrderSummary";

const CheckoutPage = () => {
  const { data: getAllAddress } = useGetAllResources<GetAllAddressResponse>({
    module: "address",
  });
  const { itemIds } = useCartStore();
  const navigate = useNavigate();
  const cartItemIds = Array.from(itemIds);

  useEffect(() => {
    if (itemIds.size < 1) navigate("/cart");
  }, [itemIds]);

  if (itemIds.size < 1) {
    return null;
  }

  const { data: getCartItems } = useGetCartItemsGroupedByStore();

  return (
    <Center mt="10px">
      <Box minWidth="1200px">
        <Flex>
          <Box width="100%" mr="10px">
            {getAllAddress?.pages.map((page) =>
              page.models
                .filter((address) => address.status === "ACTIVE")
                .map((address) => (
                  <ActiveAddress key={address.addressId} address={address} />
                ))
            )}
            <CheckoutHeader />
            {getCartItems?.map((storeName) => (
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
                {storeName.cartItems
                  .filter((item) => cartItemIds.includes(item.cartItemId))
                  .map((cartItem) => (
                    <CheckoutItemCard
                      key={cartItem.cartItemId}
                      cartItem={cartItem}
                    />
                  ))}
              </Box>
            ))}
          </Box>
          <OrderSummary />
        </Flex>
      </Box>
    </Center>
  );
};

export default CheckoutPage;
