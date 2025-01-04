import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import DynamicIconButton from "../../../../components/Button/DynamicIconButton";
import TextInput from "../../../../components/Input/TextInput";
import { ProductModels } from "../../../../entities/Product";
import useUpdateOne from "../../../../hooks/useUpdateOne";
import InventoryList from "./InventoryList";
import InventoryListHeader from "./InventoryListHeader";

interface Props {
  product?: ProductModels;
}

interface ProductProps {
  productName: string;
  description: string;
}

const UpdateButton = ({ product }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [isHoverEditInfo, setIsHoverEditInfo] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const queryClient = useQueryClient();
  const { handleSubmit, setError, control } = useForm<ProductProps>();

  const {
    loading,
    mutation: { mutate },
    setLoading,
  } = useUpdateOne<ProductProps>({ module: "product" });

  const onSubmit: SubmitHandler<ProductProps> = (data: ProductProps) => {
    const requestData = {
      ...data,
      productId: product?.productId ?? 0,
    };
    setLoading(true);
    mutate(requestData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["allData", "product", 10],
        });
        setLoading(false);
        setIsEdit(false);
      },
      onError: (error: any) => {
        setLoading(false);

        if (error.response?.data.productName) {
          setError("productName", {
            type: "server",
            message: error.response.data.storeName,
          });
        }
        if (error.response?.data.description) {
          setError("description", {
            type: "server",
            message: error.response.data.description,
          });
        }
      },
    });
  };

  return (
    <>
      <Box onClick={onOpen}>
        <DynamicIconButton
          isHover={isHover}
          setIsHover={setIsHover}
          size="25px"
          icon={FiEdit}
          text="Edit"
          color="black"
        />
      </Box>
      <Box>
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody mt="10px">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit(onSubmit)(event);
                }}
              >
                <Flex justifyContent="space-between">
                  <Box>
                    <Flex alignItems="center">
                      {isEdit ? (
                        <Box width="300px" mr="10px">
                          <TextInput
                            defaultValue={product?.productName}
                            control={control}
                            name="productName"
                            loading={loading}
                            placeholder="Product Name"
                            label="Product Name"
                            size="sm"
                          />
                        </Box>
                      ) : (
                        <Text
                          fontWeight="semibold"
                          textTransform="capitalize"
                          mr="10px"
                        >
                          {product?.productName}
                        </Text>
                      )}
                      <Box onClick={() => setIsEdit(!isEdit)}>
                        <DynamicIconButton
                          isHover={isHoverEditInfo}
                          setIsHover={setIsHoverEditInfo}
                          size="20px"
                          icon={FiEdit}
                          text="Edit"
                          color="black"
                        />
                      </Box>
                    </Flex>
                    {isEdit ? (
                      <Box width="300px" mr="10px" mt="10px">
                        <TextInput
                          defaultValue={product?.description}
                          control={control}
                          name="description"
                          loading={loading}
                          placeholder="Description"
                          label="Description"
                          size="sm"
                        />
                      </Box>
                    ) : (
                      <Text fontSize="sm" isTruncated={true} maxWidth="350px">
                        {product?.description}
                      </Text>
                    )}
                  </Box>
                  {isEdit && (
                    <Button
                      mt="35px"
                      bg="#FF5722"
                      _hover={{ bg: "#E64A19" }}
                      type="submit"
                      width="100px"
                      isLoading={loading}
                    >
                      Save
                    </Button>
                  )}
                </Flex>
              </form>
              <Divider mt="5px" mb="5px" />
              <InventoryListHeader />
              {product?.inventories.map((inv) => (
                <Box key={inv.inventoryId}>
                  <Divider />
                  <InventoryList inventory={inv} />
                </Box>
              ))}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default UpdateButton;
