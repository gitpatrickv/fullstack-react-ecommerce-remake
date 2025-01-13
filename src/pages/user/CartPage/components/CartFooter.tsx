import {
  Button,
  Card,
  Checkbox,
  Flex,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import OrangeButton from "../../../../components/Button/OrangeButton";
import useGetCartSize from "../../../../hooks/useGetCartSize";
import useCartStore from "../../../../store/cart-store";
import { formatCurrency } from "../../../../utilities/formatCurrency";

interface Props {
  handleAddRemoveAllIdsChange: () => void;
  cartItemsSize: number;
  handleDeleteAllSelectedItemClick: () => void;
  cartTotal: number;
}

const CartFooter = ({
  handleAddRemoveAllIdsChange,
  cartItemsSize,
  handleDeleteAllSelectedItemClick,
  cartTotal,
}: Props) => {
  const { data: cartSize } = useGetCartSize();
  const { itemIds } = useCartStore();

  return (
    <>
      <Card
        borderRadius="none"
        mt="10px"
        padding={4}
        position="sticky"
        bottom="0"
      >
        <HStack>
          <Flex alignItems="center" mr="20px">
            <Checkbox
              colorScheme="orange"
              isChecked={cartItemsSize === itemIds.size}
              onChange={handleAddRemoveAllIdsChange}
            />
            <Text
              ml="20px"
              fontWeight="semibold"
              cursor="pointer"
              onClick={handleAddRemoveAllIdsChange}
            >
              Select All ({cartSize})
            </Text>
          </Flex>
          <Button
            variant="unstyled"
            mr="20px"
            fontWeight="semibold"
            cursor="pointer"
            onClick={handleDeleteAllSelectedItemClick}
            _hover={{ color: "#E64A19" }}
            isDisabled={itemIds.size < 1}
          >
            Delete
          </Button>
          <Text fontWeight="semibold" color="#E64A19" cursor="pointer">
            Add to Favorites
          </Text>
          <Spacer />
          <Text fontWeight="semibold">Total (0 item): </Text>
          <Text
            color="#E64A19"
            fontWeight="semibold"
            fontSize="x-large"
            mr="10px"
          >
            {formatCurrency(cartTotal ?? 0)}
          </Text>
          <OrangeButton width="150px" isDisabled={itemIds.size < 1}>
            <Text>Check Out</Text>
          </OrangeButton>
        </HStack>
      </Card>
    </>
  );
};

export default CartFooter;
