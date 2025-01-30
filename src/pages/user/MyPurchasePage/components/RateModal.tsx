import {
  Box,
  Divider,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { OrderItem } from "../../../../entities/OrderItem";
import ProductsToRate from "./ProductsToRate";
import StoreToRate from "./StoreToRate";

interface Props {
  isOpenRateModal: boolean;
  onCloseRateModal: () => void;
  orderItems: OrderItem[];
  orderId: number;
  storeId: number;
  isStoreRated: boolean;
}

const RateModal = ({
  isOpenRateModal,
  onCloseRateModal,
  orderItems,
  orderId,
  storeId,
  isStoreRated,
}: Props) => {
  const productIds = new Set();
  const uniqueItems = orderItems.filter((item) => {
    if (productIds.has(item.productId)) {
      return false;
    }
    productIds.add(item.productId);
    return true;
  });

  return (
    <>
      <Modal
        isOpen={isOpenRateModal}
        onClose={onCloseRateModal}
        isCentered
        size="xl"
      >
        <ModalOverlay />
        <ModalContent borderRadius="none">
          <Text
            fontSize="xl"
            fontWeight="semibold"
            ml="20px"
            mt="15px"
            mb="10px"
          >
            Rate Product
          </Text>
          <ModalCloseButton />

          {!isStoreRated && (
            <>
              <Divider mt="5px" mb="10px" />
              <StoreToRate storeId={storeId} orderId={orderId} />
            </>
          )}

          {uniqueItems.map((item) => (
            <Box key={item.orderItemId}>
              <Divider />
              <ProductsToRate orderItem={item} orderId={orderId} />
            </Box>
          ))}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RateModal;
