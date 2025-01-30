import { Avatar, Box, Card, Flex, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import storePic from "../../../assets/storePic.jpg";
import OrangeButton from "../../../components/Button/OrangeButton";
import TextInput from "../../../components/Input/TextInput";
import { Store } from "../../../entities/Store";
import useUpdateOneResource from "../../../hooks/useUpdateOneResource";
import { useShopStore } from "../../../store/shop-store";
import useUploadStoreAvatar from "./hooks/useUploadStoreAvatar";

const AccountInfoPage = () => {
  const { storeId, storeName, storeContactNumber, status, picture } =
    useShopStore();
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

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadAvatar = useUploadStoreAvatar();
  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadAvatar.mutate({ file: file });
    }
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
        <Flex flexDirection="column" alignItems="center">
          <Avatar src={picture || storePic} height="150px" width="150px" />
          <OrangeButton onClick={handleInputClick} mt="20px">
            <FaCamera size="20px" />
            <Text ml="10px">Select Image</Text>
          </OrangeButton>
          <Text mt="10px" whiteSpace="nowrap">
            File size: maximum 1 MB
          </Text>
          <Text whiteSpace="nowrap">File extension: .JPEG, .PNG</Text>
          <input
            type="file"
            accept=".jpeg, .png"
            ref={fileInputRef}
            onChange={handleUploadImage}
            style={{ display: "none" }}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default AccountInfoPage;
