import {
  Button,
  Checkbox,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GoHome } from "react-icons/go";
import { PiBuildingOfficeLight } from "react-icons/pi";
import OrangeButton from "../../../../components/Button/OrangeButton";
import TextInput from "../../../../components/Input/TextInput";
import { Address } from "../../../../entities/Address";
import useChangeResourceStatus from "../../../../hooks/useChangeResourceStatus";
import useSaveResource from "../../../../hooks/useSaveResource";
import { useAddressStore } from "../../../../store/address-store";
const CreateAddressModal = () => {
  const errorFields = [
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
  const queryClient = useQueryClient();
  const { isOpen, onClose } = useAddressStore();
  const [addressType, setAddressType] = useState("");
  const [isSetAsDefault, setIsSetAsDefault] = useState(false);
  const [addressId, setAddressId] = useState<string | number>("");
  const { handleSubmit, setError, control, setValue, reset } =
    useForm<Address>();

  const {
    loading,
    mutation: { mutate },
    setLoading,
  } = useSaveResource<Address>({ module: "address" });

  const onSubmit: SubmitHandler<Address> = (data: Address) => {
    setLoading(true);
    mutate(data, {
      onSuccess: (response) => {
        setLoading(false);
        onClose();
        reset();
        if (!isSetAsDefault) {
          queryClient.invalidateQueries({
            queryKey: ["allData", "address"],
          });
        } else {
          setAddressId(response.addressId);
        }
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

  const handleSetDefaultClick = () => {
    setIsSetAsDefault(!isSetAsDefault);
  };

  const { mutate: setDefaultAddress } = useChangeResourceStatus();

  useEffect(() => {
    if (isSetAsDefault && addressId) {
      setDefaultAddress(
        {
          module: "address",
          id: addressId || "",
          status: "ACTIVE",
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["allData", "address"],
            });
            setAddressId("");
            setIsSetAsDefault(false);
          },
        }
      );
    }
  }, [addressId, isSetAsDefault]);

  return (
    <>
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
                New Address
              </Text>
              <Text fontSize="sm">
                To place an order, please add a delivery address and set it as
                default.
              </Text>
              <Divider mb="20px" mt="15px" />
              <TextInput
                control={control}
                name="fullName"
                loading={loading}
                placeholder="Full Name"
                label="Full Name"
              />
              <TextInput
                control={control}
                name="contactNumber"
                loading={loading}
                placeholder="Contact No."
                label="Contact Number"
                mt="10px"
              />

              <TextInput
                control={control}
                name="streetAddress"
                loading={loading}
                placeholder="Complete Address"
                label="Contact Number"
                mt="10px"
              />

              <TextInput
                control={control}
                name="city"
                loading={loading}
                placeholder="City"
                label="City"
                mt="10px"
              />
              <TextInput
                control={control}
                name="postCode"
                loading={loading}
                placeholder="Post Code"
                label="Post Code"
                mt="10px"
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
              <Checkbox
                isChecked={isSetAsDefault}
                onChange={handleSetDefaultClick}
                mt="10px"
                colorScheme="orange"
              >
                Set as Default Address
              </Checkbox>
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

export default CreateAddressModal;
