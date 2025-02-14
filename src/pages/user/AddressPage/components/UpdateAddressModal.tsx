import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { PiBuildingOfficeLight } from "react-icons/pi";
import OrangeButton from "../../../../components/Button/OrangeButton";
import TextInput from "../../../../components/Input/TextInput";
import { Address } from "../../../../entities/Address";
import useUpdateOneResource from "../../../../hooks/useUpdateOneResource";

interface Props {
  address: Address;
}

const UpdateAddressModal = ({ address }: Props) => {
  const errorFields = [
    "addressId",
    "fullName",
    "streetAddress",
    "contactNumber",
    "city",
    "postCode",
    "addressType",
  ];
  const buttonStyle = {
    variant: "outline",
    borderRadius: "none",
    width: "120px",
    _hover: { bg: "none", color: "#E64A19" },
    _active: { bg: "none" },
    mr: "10px",
  };
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [addressType, setAddressType] = useState(address.addressType);
  const queryClient = useQueryClient();
  const { handleSubmit, setError, control, setValue } = useForm<Address>();

  const {
    loading,
    mutation: { mutate },
    setLoading,
  } = useUpdateOneResource<Address>({ module: "address" });

  const onSubmit: SubmitHandler<Address> = (data: Address) => {
    setLoading(true);
    const requestData = {
      ...data,
      addressId: address?.addressId ?? 0,
    };

    mutate(requestData, {
      onSuccess: () => {
        setLoading(false);
        onClose();
        queryClient.invalidateQueries({
          queryKey: ["allData", "address"],
        });
      },
      onError: (error: any) => {
        setLoading(false);

        errorFields.forEach((field: any) => {
          if (error.response?.data[field]) {
            setError(field, {
              type: "server",
              message: error.response.data[field],
            });
          }
        });
      },
    });
  };

  const handleTypeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const addressType = e.currentTarget.value;
    setAddressType(addressType);
    setValue("addressType", addressType);
  };

  return (
    <>
      <Button width="100%" mr="5px" borderRadius="none" onClick={onOpen}>
        <FiEdit />
        <Text ml="5px">Edit</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(onSubmit)(event);
          }}
        >
          <ModalContent borderRadius="none">
            <ModalBody>
              <Text fontSize="xl" fontWeight="semibold" mt="10px">
                Edit Address
              </Text>
              <Divider mb="20px" mt="15px" />
              <Text fontSize="sm" color="#E64A19">
                Full Name
              </Text>
              <TextInput
                defaultValue={address.fullName}
                control={control}
                name="fullName"
                loading={loading}
                placeholder="Full Name"
              />
              <Text mt="10px" fontSize="sm" color="#E64A19">
                Address
              </Text>
              <TextInput
                defaultValue={address.streetAddress}
                control={control}
                name="streetAddress"
                loading={loading}
                placeholder="Complete Address"
              />
              <Text mt="10px" fontSize="sm" color="#E64A19">
                City
              </Text>
              <TextInput
                defaultValue={address.city}
                control={control}
                name="city"
                loading={loading}
                placeholder="City"
              />
              <Text mt="10px" fontSize="sm" color="#E64A19">
                Postcode
              </Text>
              <TextInput
                defaultValue={address.postCode}
                control={control}
                name="postCode"
                loading={loading}
                placeholder="Post Code"
              />
              <Text mt="10px" fontSize="sm" color="#E64A19">
                Contact Number
              </Text>
              <TextInput
                defaultValue={address.contactNumber}
                control={control}
                name="contactNumber"
                loading={loading}
                placeholder="Contact No."
              />
              <Text mb="5px" mt="10px">
                Label As:
              </Text>
              <Button
                value={"HOME"}
                onClick={(event) => handleTypeClick(event)}
                color={addressType === "HOME" ? "#E64A19" : "white.500"}
                borderColor={addressType === "HOME" ? "#E64A19" : "white.500"}
                {...buttonStyle}
              >
                <GoHome size="25px" />
                <Text ml="5px">Home</Text>
              </Button>
              <Button
                value={"OFFICE"}
                onClick={(event) => handleTypeClick(event)}
                color={addressType === "OFFICE" ? "#E64A19" : "white.500"}
                borderColor={addressType === "OFFICE" ? "#E64A19" : "white.500"}
                {...buttonStyle}
              >
                <PiBuildingOfficeLight size="25px" />
                <Text ml="5px">Office</Text>
              </Button>
            </ModalBody>

            <ModalFooter mb="10px">
              <Button
                onClick={onClose}
                borderRadius="none"
                mr="10px"
                width="100px"
              >
                Cancel
              </Button>
              <OrangeButton type="submit" width="100px">
                Save
              </OrangeButton>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default UpdateAddressModal;
