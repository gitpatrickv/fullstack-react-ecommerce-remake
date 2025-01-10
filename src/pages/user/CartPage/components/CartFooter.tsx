import { Card, Checkbox, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import OrangeButton from "../../../../components/Button/OrangeButton";
import useGetCartSize from "../hooks/useGetCartSize";

const CartFooter = () => {
  const { data } = useGetCartSize();
  return (
    <>
      <Card borderRadius="none" mt="10px" padding={4}>
        <HStack>
          <Flex alignItems="center" mr="20px">
            <Checkbox colorScheme="orange" />
            <Text ml="20px" fontWeight="semibold" cursor="pointer">
              Select All ({data})
            </Text>
          </Flex>
          <Text mr="20px" fontWeight="semibold" cursor="pointer">
            Delete
          </Text>
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
            P0
          </Text>
          <OrangeButton width="150px">
            <Text>Check Out</Text>
          </OrangeButton>
        </HStack>
      </Card>
    </>
  );
};

export default CartFooter;
