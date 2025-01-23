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

interface Props {
  isOpenRateModal: boolean;
  onCloseRateModal: () => void;
  orderItems: OrderItem[];
}

const RateModal = ({
  isOpenRateModal,
  onCloseRateModal,
  orderItems,
}: Props) => {
  const uniqueItems = orderItems.filter(
    (item, index, self) =>
      index === self.findIndex((i) => i.productId === item.productId)
  );

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

          {uniqueItems.map((item) => (
            <Box key={item.orderItemId}>
              <Divider />
              <ProductsToRate orderItem={item} />
            </Box>
          ))}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RateModal;
