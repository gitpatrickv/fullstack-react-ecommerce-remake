import { Box, Center, Flex } from "@chakra-ui/react";
import AddressCard from "./component/AddressCard";
import CheckoutHeader from "./component/CheckoutHeader";
import CheckoutItemCard from "./component/CheckoutItemCard";
import OrderSummary from "./component/OrderSummary";

const CheckoutPage = () => {
  return (
    <Center mt="10px">
      <Box minWidth="1200px">
        <Flex>
          <Flex flexDirection="column" width="100%" mr="10px">
            <AddressCard />
            <CheckoutHeader />
            <CheckoutItemCard />
          </Flex>
          <OrderSummary />
        </Flex>
      </Box>
    </Center>
  );
};

export default CheckoutPage;
