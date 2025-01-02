import { Avatar, Box, Button, Card, Flex, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import TextInput from "../../../components/Input/TextInput";
import { Store } from "../../../entities/Store";
import useUpdateOne from "../../../hooks/useUpdateOne";
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
  } = useUpdateOne<Store>({ module: "store" });

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
    <Card padding={10}>
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
            <Button
              isLoading={loading}
              type="submit"
              width="100%"
              bg="#FF5722"
              _hover={{ bg: "#E64A19" }}
              mt={4}
            >
              Save
            </Button>
          </form>
        </Box>
        <Flex flexDirection="column">
          <Avatar
            src="https://media.istockphoto.com/id/912819604/vector/storefront-flat-design-e-commerce-icon.jpg?s=612x612&w=0&k=20&c=_x_QQJKHw_B9Z2HcbA2d1FH1U1JVaErOAp2ywgmmoTI="
            height="150px"
            width="150px"
          />
          <Button
            color="black"
            bg="#FF5722"
            _hover={{ bg: "#E64A19" }}
            mt="20px"
          >
            <FaCamera size="20px" />
            <Text ml="5px">Add Photo</Text>
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default AccountInfoPage;
