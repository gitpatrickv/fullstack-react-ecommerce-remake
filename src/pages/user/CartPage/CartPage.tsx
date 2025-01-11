import {
  Box,
  Card,
  Center,
  Checkbox,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import CartFooter from "./components/CartFooter";
import CartHeader from "./components/CartHeader";
import CartItemCard from "./components/CartItemCard";
import useDeleteAllSelectedItem from "./hooks/useDeleteAllSelectedItem";
import useGetCartItemsGroupedByStore from "./hooks/useGetCartItemsGroupedByStore";

const CartPage = () => {
  const { data: getCartItems, isLoading } = useGetCartItemsGroupedByStore();

  if (isLoading) {
    <Center height="100vh">
      <Spinner size="lg" />
    </Center>;
  }

  const [itemIds, setItemIds] = useState<Set<number>>(new Set());

  const handleAddRemoveIdChange = (itemId: number) => {
    setItemIds((prevIds) => {
      const updatedIds = new Set(prevIds);
      if (updatedIds.has(itemId)) {
        updatedIds.delete(itemId);
      } else {
        updatedIds.add(itemId);
      }
      return updatedIds;
    });
  };

  const cartItemIds =
    getCartItems?.flatMap((cart) => cart.cartItems).length || 0;

  const handleAddRemoveAllIdsChange = () => {
    setItemIds((prevIds) => {
      const updatedIds = new Set(prevIds);

      if (cartItemIds === itemIds.size) {
        getCartItems?.forEach((storeName) =>
          storeName.cartItems.forEach((item) =>
            updatedIds.delete(item.cartItemId)
          )
        );
      } else {
        getCartItems?.forEach((storeName) =>
          storeName.cartItems.forEach((item) => updatedIds.add(item.cartItemId))
        );
      }
      return updatedIds;
    });
  };

  const handleAddRemoveIdsByStore = (storeName: string) => {
    setItemIds((prevIds) => {
      const updatedIds = new Set(prevIds);
      const storeCartItemIds = getCartItems
        ?.find((store) => store.storeName === storeName)
        ?.cartItems.map((item) => item.cartItemId);

      if (storeCartItemIds?.every((id) => updatedIds.has(id))) {
        storeCartItemIds?.forEach((id) => updatedIds.delete(id));
      } else {
        storeCartItemIds?.forEach((id) => updatedIds.add(id));
      }

      return updatedIds;
    });
  };

  const isStoreChecked = (storeName: string) => {
    const storeCartItemIds = getCartItems
      ?.find((store) => store.storeName === storeName)
      ?.cartItems.map((item) => item.cartItemId);
    return storeCartItemIds?.every((id) => itemIds.has(id)) ?? false;
  };

  const { mutate: deleteAllSelectedItem } = useDeleteAllSelectedItem();

  const handleDeleteAllSelectedItemClick = () => {
    deleteAllSelectedItem(
      {
        ids: Array.from(itemIds),
      },
      {
        onSuccess: () => {
          setItemIds(new Set());
        },
      }
    );
  };

  if ((getCartItems?.length ?? 0) < 1 && !isLoading) {
    return (
      <Center height="70vh">
        <Text>No cart items found.</Text>
      </Center>
    );
  }

  return (
    <Center mt="10px">
      <Box minWidth="1200px">
        {!isLoading && (
          <CartHeader
            handleAddRemoveAllIdsChange={handleAddRemoveAllIdsChange}
            cartItemIds={cartItemIds}
            itemIds={itemIds}
          />
        )}
        {getCartItems?.map((storeName) => (
          <Box key={storeName.storeName} mt="10px">
            <Card
              padding={4}
              borderRadius="none"
              borderBottom="1px solid"
              borderColor="	#E8E8E8"
            >
              <Flex>
                <Checkbox
                  colorScheme="orange"
                  isChecked={isStoreChecked(storeName.storeName)}
                  onChange={() =>
                    handleAddRemoveIdsByStore(storeName.storeName)
                  }
                />
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
              <CartItemCard
                key={cartItem.cartItemId}
                cartItem={cartItem}
                handleAddRemoveIdChange={handleAddRemoveIdChange}
                itemIds={itemIds}
                setItemIds={setItemIds}
              />
            ))}
          </Box>
        ))}
        {!isLoading && (
          <CartFooter
            handleAddRemoveAllIdsChange={handleAddRemoveAllIdsChange}
            cartItemIds={cartItemIds}
            itemIds={itemIds}
            handleDeleteAllSelectedItemClick={handleDeleteAllSelectedItemClick}
          />
        )}
      </Box>
    </Center>
  );
};

export default CartPage;
