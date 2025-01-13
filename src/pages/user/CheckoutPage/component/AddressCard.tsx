import { Badge, Card, Flex, Text } from "@chakra-ui/react";
import { IoLocation } from "react-icons/io5";

const AddressCard = () => {
  return (
    <Card borderRadius="none" padding={5} mb="10px">
      <Flex alignItems="center">
        <IoLocation size="20px" color="#E64A19" />
        <Text ml="5px" fontWeight="semibold" color="#E64A19">
          Shipping Address
        </Text>
      </Flex>
      <Flex>
        <Text mr="20px">patrick</Text>
        <Text>009898989</Text>
      </Flex>
      <Flex alignItems="center">
        <Text>123 fck u, 1400</Text>
        <Badge variant="solid" colorScheme="blue" ml="10px">
          home
        </Badge>
      </Flex>
    </Card>
  );
};

export default AddressCard;
