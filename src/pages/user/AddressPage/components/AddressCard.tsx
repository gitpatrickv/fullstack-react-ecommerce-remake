import { Box, Button, Card, Flex, HStack, Text } from "@chakra-ui/react";
import OrangeButton from "../../../../components/Button/OrangeButton";
import { Address } from "../../../../entities/Address";
interface Props {
  address: Address;
}

const AddressCard = ({ address }: Props) => {
  return (
    <Card height="300px" borderRadius="none" padding={4} position="relative">
      <Text fontSize="lg" fontWeight="bold">
        {address.fullName}
      </Text>
      <HStack>
        <Flex
          bg={address.addressType === "HOME" ? "#E64A19" : "#1877F2"}
          borderRadius="20px"
          padding={1}
          width="60px"
          height="20px"
          alignItems="center"
          justifyContent="center"
          userSelect="none"
        >
          <Text color="white" fontSize="xs">
            {address.addressType}
          </Text>
        </Flex>
        {address.status === "ACTIVE" && (
          <Flex
            width="60px"
            height="20px"
            border="1px solid"
            alignItems="center"
            justifyContent="center"
            borderColor="#E64A19"
            userSelect="none"
          >
            <Text fontSize="xs" color="#E64A19" fontWeight="semibold">
              Default
            </Text>
          </Flex>
        )}
      </HStack>
      <Text>{address.streetAddress}</Text>

      <Text textTransform="capitalize">
        {address.city}, {address.postCode}
      </Text>
      <Text> {address.contactNumber}</Text>
      <Box position="absolute" bottom="0" left="0" padding={4} width="100%">
        <Flex mb="5px">
          <Button width="100%" mr="5px" borderRadius="none">
            Edit
          </Button>
          <Button width="100%" borderRadius="none">
            Delete
          </Button>
        </Flex>
        {address.status === "INACTIVE" && (
          <OrangeButton width="100%">Set as default</OrangeButton>
        )}
      </Box>
    </Card>
  );
};

export default AddressCard;
