import { Badge, Card, Flex, Spacer, Text } from "@chakra-ui/react";
import { IoLocation } from "react-icons/io5";
import { Address } from "../../../../entities/Address";
import { useNavigate } from "react-router-dom";

interface Props {
  address: Address;
}

const ActiveAddress = ({ address }: Props) => {
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate("/user/account/address");
  };
  return (
    <>
      <Card borderRadius="none" padding={5} mb="10px">
        <Flex alignItems="center">
          <IoLocation size="20px" color="#E64A19" />
          <Text ml="5px" fontWeight="semibold" color="#E64A19" mr="10px">
            Shipping Address
          </Text>

          <Spacer />
          <Text
            onClick={handleNavigateClick}
            cursor="pointer"
            color="#1877F2"
            fontWeight="semibold"
          >
            Change
          </Text>
        </Flex>
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
      </Card>
    </>
  );
};

export default ActiveAddress;
