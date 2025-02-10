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
import { formatCurrency } from "../../../utilities/formatCurrency";

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

  const hasActiveAddress = getAllAddress?.pages.some((page) =>
    page.models.some((address) => address.status === "ACTIVE")
  );

  const computeTotalAmountByStore = (storeName: string) => {
    if (!getCartItems) return 0;

    return getCartItems
      ?.filter((store) => store.storeName === storeName)
      .flatMap((store) => store.cartItems)
      .filter((cartItem) => cartItemIds.includes(cartItem.cartItemId))
      .reduce(
        (acc, cartItem) => acc + cartItem.inventory.price * cartItem.quantity,
        50
      );
  };

  return (
    <Center mt="10px" mb="50px">
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
            {getCartItems
              ?.filter((store) =>
                store.cartItems.some((item) =>
                  cartItemIds.includes(item.cartItemId)
                )
              )
              .map((storeName) => (
                <Box mt="10px" key={storeName.storeName}>
                  <Card
                    borderRadius="none"
                    borderBottom="1px solid"
                    borderColor="#E8E8E8"
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

                  <Card
                    borderRadius="none"
                    borderTop="1px solid"
                    borderColor="#E8E8E8"
                    padding={5}
                  >
                    <Text textAlign="end">
                      Shipping Fee:{" "}
                      <Text
                        as="span"
                        color="#E64A19"
                        fontSize="lg"
                        fontWeight="semibold"
                      >
                        {formatCurrency(50)}
                      </Text>
                    </Text>
                    <Text textAlign="end">
                      Order Total:{" "}
                      <Text
                        as="span"
                        color="#E64A19"
                        fontSize="lg"
                        fontWeight="semibold"
                      >
                        {formatCurrency(
                          computeTotalAmountByStore(storeName.storeName)
                        )}
                      </Text>
                    </Text>
                  </Card>
                </Box>
              ))}
          </Box>
          <OrderSummary hasActiveAddress={hasActiveAddress ?? false} />
        </Flex>
      </Box>
    </Center>
  );
};

export default CheckoutPage;
