import {
  Box,
  Card,
  Center,
  Checkbox,
  Flex,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import ViewShopButton from "../../../components/Button/ViewShopButton";
import useCartStore from "../../../store/cart-store";
import CartFooter from "./components/CartFooter";
import CartHeader from "./components/CartHeader";
import CartItemCard from "./components/CartItemCard";
import useAddProductsToFavorite from "./hooks/useAddProductsToFavorite";
import useDeleteAllSelectedItem from "./hooks/useDeleteAllSelectedItem";
import useGetCartItemsGroupedByStore from "./hooks/useGetCartItemsGroupedByStore";

const CartPage = () => {
  const { data: getCartItems, isLoading } = useGetCartItemsGroupedByStore();

  if (isLoading) {
    <Center height="100vh">
      <Spinner size="lg" />
    </Center>;
  }

  const { itemIds, setItemIds, resetItemIds } = useCartStore();

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

  const cartItemsSize =
    getCartItems?.flatMap((cart) => cart.cartItems).length || 0;

  const handleAddRemoveAllIdsChange = () => {
    setItemIds((prevIds) => {
      const updatedIds = new Set(prevIds);

      if (cartItemsSize === itemIds.size) {
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDeleteAllSelectedItemClick = () => {
    deleteAllSelectedItem(
      {
        ids: Array.from(itemIds),
      },
      {
        onSuccess: () => {
          resetItemIds();
          onClose();
        },
      }
    );
  };

  const { mutate: addProductsToFavorite } = useAddProductsToFavorite();
  const handleAddProductsToFavoriteClick = () => {
    addProductsToFavorite(
      {
        ids: Array.from(itemIds),
      },
      {
        onSuccess: () => {
          resetItemIds();
        },
      }
    );
  };

  const [cartTotal, setCartTotal] = useState(0);

  const computeTotalAmount = (itemIds: number[]) => {
    if (!getCartItems) return 0;
    const total = getCartItems
      .flatMap((store) =>
        store.cartItems.filter((cartItem) =>
          itemIds.includes(cartItem.cartItemId)
        )
      )
      .reduce(
        (acc, cartItem) => acc + cartItem.quantity * cartItem.inventory.price,
        0
      );

    return total;
  };

  useEffect(() => {
    const total = computeTotalAmount(Array.from(itemIds));
    setCartTotal(total);
  }, [itemIds, getCartItems]);

  if (getCartItems && (getCartItems?.length ?? 0) < 1) {
    return (
      <Center height="70vh" flexDirection="column">
        <FiShoppingCart size="100px" />
        <Text mt="20px" fontSize="large" whiteSpace="nowrap">
          Your shopping cart is empty
        </Text>
      </Center>
    );
  }

  return (
    <Center mt="10px">
      <Box minWidth="1200px">
        {getCartItems && (
          <CartHeader
            handleAddRemoveAllIdsChange={handleAddRemoveAllIdsChange}
            cartItemsSize={cartItemsSize}
          />
        )}
        {getCartItems?.map((storeName) => (
          <Box key={storeName.storeId} mt="10px">
            <Card
              padding={4}
              borderRadius="none"
              borderBottom="1px solid"
              borderColor="	#E8E8E8"
            >
              <Flex alignItems="center">
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
                  mr="10px"
                  userSelect="none"
                >
                  {storeName.storeName}
                </Text>
                <ViewShopButton
                  storeId={storeName.storeId}
                  storeName={storeName.storeName}
                  height="30px"
                />
              </Flex>
            </Card>
            {storeName.cartItems.map((cartItem) => (
              <CartItemCard
                key={cartItem.cartItemId}
                cartItem={cartItem}
                handleAddRemoveIdChange={handleAddRemoveIdChange}
              />
            ))}
          </Box>
        ))}
        {getCartItems && (
          <CartFooter
            handleAddRemoveAllIdsChange={handleAddRemoveAllIdsChange}
            cartItemsSize={cartItemsSize}
            handleDeleteAllSelectedItemClick={handleDeleteAllSelectedItemClick}
            cartTotal={cartTotal}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            handleAddProductsToFavoriteClick={handleAddProductsToFavoriteClick}
          />
        )}
      </Box>
    </Center>
  );
};

export default CartPage;
