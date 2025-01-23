import { Box, Button, Card, Flex, HStack, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import OrangeButton from "../../../../components/Button/OrangeButton";
import { Address } from "../../../../entities/Address";
import useChangeResourceStatus from "../../../../hooks/useChangeResourceStatus";
import useDeleteAddress from "../hooks/useDeleteAddress";
import UpdateAddressModal from "./UpdateAddressModal";
interface Props {
  address: Address;
}

const AddressCard = ({ address }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: setDefaultAddress } = useChangeResourceStatus();
  const handleSetDefaultAddressClick = () => {
    setDefaultAddress(
      {
        module: "address",
        id: address.addressId,
        status: "ACTIVE",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["allData", "address"],
          });
        },
      }
    );
  };

  const { mutate: deleteAddress } = useDeleteAddress(address.addressId);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const handleDeleteClick = () => {
    setIsLoadingDelete(true);
    deleteAddress(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["allData", "address"],
        });
        setIsLoadingDelete(false);
      },
      onError: () => {
        setIsLoadingDelete(false);
      },
    });
  };

  return (
    <Card height="290px" borderRadius="none" padding={4} position="relative">
      <Text fontSize="lg" fontWeight="semibold" textTransform="capitalize">
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
        <Flex>
          <UpdateAddressModal address={address} />
          <Button
            width="100%"
            borderRadius="none"
            color="red"
            isLoading={isLoadingDelete}
            onClick={handleDeleteClick}
          >
            <MdDeleteOutline size="20px" />
            <Text ml="5px">Delete</Text>
          </Button>
        </Flex>
        {address.status === "INACTIVE" && (
          <OrangeButton
            width="100%"
            onClick={handleSetDefaultAddressClick}
            mt="5px"
          >
            Set as default
          </OrangeButton>
        )}
      </Box>
    </Card>
  );
};

export default AddressCard;
