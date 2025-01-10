import {
  Box,
  Card,
  Center,
  Checkbox,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import CartFooter from "./components/CartFooter";
import CartHeader from "./components/CartHeader";
import CartItemCard from "./components/CartItemCard";
import useGetCartItemsGroupedByStore from "./hooks/useGetCartItemsGroupedByStore";

const CartPage = () => {
  const { data: getCartItems, isLoading } = useGetCartItemsGroupedByStore();

  if (isLoading) {
    <Center height="100vh">
      <Spinner size="lg" />
    </Center>;
  }

  if (getCartItems?.length === 0 && !isLoading) {
    return (
      <Center height="70vh">
        <Text>No cart items found.</Text>
      </Center>
    );
  }

  return (
    <Center mt="10px">
      <Box minWidth="1200px">
        {!isLoading && <CartHeader />}
        {getCartItems?.map((storeName) => (
          <Box key={storeName.storeName} mt="10px">
            <Card
              padding={4}
              borderRadius="none"
              borderBottom="1px solid"
              borderColor="	#E8E8E8"
            >
              <Flex>
                <Checkbox colorScheme="orange" />
                <Text
                  fontWeight="semibold"
                  textTransform="capitalize"
                  ml="20px"
                >
                  {storeName.storeName}
                </Text>
              </Flex>
            </Card>
            {storeName.cartItems.map((cartItem) => (
              <CartItemCard key={cartItem.cartItemId} cartItem={cartItem} />
            ))}
          </Box>
        ))}
        {!isLoading && <CartFooter />}
      </Box>
    </Center>
  );
};

export default CartPage;
