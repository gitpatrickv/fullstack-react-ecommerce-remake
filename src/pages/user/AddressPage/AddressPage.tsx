import { Card, Center, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";
import OrangeButton from "../../../components/Button/OrangeButton";
import GetAllAddressResponse from "../../../entities/Address";
import useGetAllResources from "../../../hooks/useGetAllResources";
import { useAddressStore } from "../../../store/address-store";
import AddressCard from "./components/AddressCard";

const AddressPage = () => {
  const { data: getAllAddress } = useGetAllResources<GetAllAddressResponse>({
    module: "address",
  });
  const addressLength =
    getAllAddress?.pages?.flatMap((page) => page.models).length || 0;
  const { onOpen } = useAddressStore();

  return (
    <>
      <Card borderRadius="none" mb="10px">
        <Flex alignItems="center" justifyContent="space-between" padding={3}>
          <Text fontSize="xl" fontWeight="semibold">
            My Addresses
          </Text>
          <OrangeButton onClick={onOpen}>
            <GoPlus size="25px" />
            <Text ml="5px">Add New Address</Text>
          </OrangeButton>
        </Flex>
      </Card>
      {addressLength < 1 ? (
        <Center height="50vh">
          <Text fontSize="x-large" fontWeight="semibold">
            Set up your delivery address now to start shopping!
          </Text>
        </Center>
      ) : (
        <SimpleGrid columns={3} spacing={2}>
          {getAllAddress?.pages.map((page) =>
            page.models.map((address) => (
              <AddressCard key={address.addressId} address={address} />
            ))
          )}
        </SimpleGrid>
      )}
    </>
  );
};

export default AddressPage;
