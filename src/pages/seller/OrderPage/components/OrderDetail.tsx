import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import WhiteButton from "../../../../components/Button/WhiteButton";
import { Order } from "../../../../entities/Order";
import { formatCurrency } from "../../../../utilities/formatCurrency";

interface Props {
  order: Order;
}

const OrderDetail = ({ order }: Props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <>
      <WhiteButton height="30px" ml="10px" onClick={onOpen}>
        <Text fontSize="sm">Order Details</Text>
      </WhiteButton>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="none" padding={5}>
          <ModalCloseButton />
          <Text mb="10px" fontSize="xl" fontWeight="semibold">
            Order Details
          </Text>
          <Text>Order Id: {order.orderId}</Text>
          <Text>Order Status: {order.orderStatus.replace(/_/g, " ")}</Text>
          <Text>
            Recipient:{" "}
            <Text as="span" textTransform="capitalize">
              {order.recipientName}
            </Text>
          </Text>
          <Text>Contact No.: {order.contactNumber}</Text>
          <Text>Address: {order.deliveryAddress}</Text>
          <Text>Payment Method: {order.paymentMethod.replace(/_/g, " ")}</Text>
          <Text>Total Items: {order.itemQuantity}</Text>
          <Text>Delivery Cost: {order.deliveryCost}</Text>
          <Text>Total Amount: {formatCurrency(order.totalAmount)}</Text>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderDetail;
