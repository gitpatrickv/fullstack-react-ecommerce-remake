import { Badge, Flex, Text } from "@chakra-ui/react";
import { Address } from "../../../../entities/Address";

interface Props {
  address: Address;
}

const ActiveAddress = ({ address }: Props) => {
  return (
    <>
      <Flex>
        <Text mr="20px">{address.fullName}</Text>
        <Text>{address.contactNumber}</Text>
      </Flex>
      <Flex alignItems="center">
        <Text>
          {address.streetAddress},{" "}
          <Text as="span" textTransform="capitalize">
            {address.city}
          </Text>
          , {address.postCode}
        </Text>
        <Badge variant="solid" colorScheme="orange" ml="10px">
          {address.addressType}
        </Badge>
        <Badge colorScheme="blue" ml="10px">
          Default
        </Badge>
      </Flex>
    </>
  );
};

export default ActiveAddress;
