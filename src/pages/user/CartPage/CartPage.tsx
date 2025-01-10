import {
  Center,
  Box,
  Spinner,
  Text,
  Card,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import CartHeader from "./components/CartHeader";
import useGetCartItemsGroupedByStore from "./hooks/useGetCartItemsGroupedByStore";
import CartItemCard from "./components/CartItemCard";

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
        <CartHeader />
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
      </Box>
    </Center>
  );
};

export default CartPage;
