import {
  Button,
  Card,
  Checkbox,
  Flex,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AlertDialogBox from "../../../../components/AlertDialog/AlertDialogBox";
import OrangeButton from "../../../../components/Button/OrangeButton";
import useCartStore from "../../../../store/cart-store";
import { formatCurrency } from "../../../../utilities/formatCurrency";

interface Props {
  handleAddRemoveAllIdsChange: () => void;
  cartItemsSize: number;
  handleDeleteAllSelectedItemClick: () => void;
  cartTotal: number;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const CartFooter = ({
  handleAddRemoveAllIdsChange,
  cartItemsSize,
  handleDeleteAllSelectedItemClick,
  cartTotal,
  isOpen,
  onClose,
  onOpen,
}: Props) => {
  const { itemIds } = useCartStore();
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate("/checkout");
  };

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
              Select All ({cartItemsSize})
            </Text>
          </Flex>
          <Button
            variant="unstyled"
            mr="20px"
            fontWeight="semibold"
            onClick={onOpen}
            _hover={{ color: "#E64A19" }}
            isDisabled={itemIds.size < 1}
          >
            Delete
          </Button>
          <Button
            variant="unstyled"
            fontWeight="semibold"
            color="#E64A19"
            isDisabled={itemIds.size < 1}
          >
            Add to Favorites
          </Button>
          <Spacer />
          <Text fontWeight="semibold">Total ({itemIds.size} item): </Text>
          <Text
            color="#E64A19"
            fontWeight="semibold"
            fontSize="x-large"
            mr="10px"
          >
            {formatCurrency(cartTotal ?? 0)}
          </Text>
          <OrangeButton
            width="150px"
            isDisabled={itemIds.size < 1}
            onClick={handleNavigateClick}
          >
            <Text>Check Out</Text>
          </OrangeButton>
        </HStack>
      </Card>
      <AlertDialogBox
        isOpen={isOpen}
        onClose={onClose}
        title={"Delete Products"}
        content={`Are you sure you want to remove all ${itemIds.size} products?`}
        buttonName={"Delete"}
        color={"red.500"}
        hoverColor={"red.600"}
        fn={handleDeleteAllSelectedItemClick}
      />
    </>
  );
};

export default CartFooter;
