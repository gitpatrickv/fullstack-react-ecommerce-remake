import { Avatar, Box, Card, Flex, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import OrangeButton from "../../../components/Button/OrangeButton";
import TextInput from "../../../components/Input/TextInput";
import { Store } from "../../../entities/Store";
import useUpdateOneResource from "../../../hooks/useUpdateOneResource";
import { useShopStore } from "../../../store/shop-store";

const AccountInfoPage = () => {
  const { storeId, storeName, storeContactNumber, status } = useShopStore();
  const queryClient = useQueryClient();
  const { handleSubmit, setError, control, setValue } = useForm<Store>({
    defaultValues: {
      storeName: storeName as string | undefined,
      contactNumber: storeContactNumber as string | undefined,
    },
  });

  useEffect(() => {
    if (storeName && storeContactNumber) {
      setValue("storeName", storeName);
      setValue("contactNumber", storeContactNumber);
    }
  }, [storeName, storeContactNumber]);

  const {
    loading,
    mutation: { mutate },
    setLoading,
  } = useUpdateOneResource<Store>({ module: "store" });

  const onSubmit: SubmitHandler<Store> = (data: Store) => {
    const requestData = {
      ...data,
      storeId: storeId ?? 0,
    };
    setLoading(true);
    mutate(requestData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["store"],
        });
        setLoading(false);
      },
      onError: (error: any) => {
        setLoading(false);

        if (error.response?.data.storeName) {
          setError("storeName", {
            type: "server",
            message: error.response.data.storeName,
          });
        }
        if (error.response?.data.contactNumber) {
          setError("contactNumber", {
            type: "server",
            message: error.response.data.contactNumber,
          });
        }
      },
    });
  };

  return (
    <Card padding={10} borderRadius="none">
      <Text fontSize="lg" fontWeight="semibold">
        Shop Status:
        <Text as="span" color="#E64A19" ml="10px">
          {status}
        </Text>
      </Text>
      <Flex justifyContent="space-around" alignItems="center">
        <Box>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(onSubmit)(event);
            }}
          >
            <Flex alignItems="center">
              <Text
                whiteSpace="nowrap"
                mr="20px"
                fontSize="lg"
                fontWeight="semibold"
              >
                Store Name
              </Text>
              <TextInput
                control={control}
                name="storeName"
                loading={loading}
                placeholder="Store Name"
                label="Store Name"
                width="300px"
              />
            </Flex>
            <Flex alignItems="center" mt="20px">
              <Text
                whiteSpace="nowrap"
                mr="20px"
                fontSize="lg"
                fontWeight="semibold"
              >
                Contact No.
              </Text>
              <TextInput
                control={control}
                name="contactNumber"
                loading={loading}
                placeholder="Contact Number"
                label="Contact Number"
                width="300px"
              />
            </Flex>
            <OrangeButton
              type={"submit"}
              width="100%"
              mt={4}
              isLoading={loading}
            >
              Save
            </OrangeButton>
          </form>
        </Box>
        <Flex flexDirection="column">
          <Avatar
            src="https://media.istockphoto.com/id/912819604/vector/storefront-flat-design-e-commerce-icon.jpg?s=612x612&w=0&k=20&c=_x_QQJKHw_B9Z2HcbA2d1FH1U1JVaErOAp2ywgmmoTI="
            height="150px"
            width="150px"
          />
          <OrangeButton mt="20px">
            <FaCamera size="20px" />
            <Text ml="10px">Add Photo</Text>
          </OrangeButton>
        </Flex>
      </Flex>
    </Card>
  );
};

export default AccountInfoPage;
