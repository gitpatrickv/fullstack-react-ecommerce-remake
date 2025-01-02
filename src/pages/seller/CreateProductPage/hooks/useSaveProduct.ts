import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useToast } from "@chakra-ui/react/toast";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;
export interface InventoryModel {
  quantity: number;
  price: number;
  color?: string;
  size?: string;
}

export interface SaveProductProps {
  productName: string;
  description: string;
  category: string;
  inventories: InventoryModel[];
  file: FileList;
}

const useSaveProduct = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue, setError, control } =
    useForm<SaveProductProps>();
  const [imageFile, setImageFile] = useState<FileList | null>(null);
  const [imagePreview, setImagePreview] = useState<string[] | null>(null);

  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      apiClient
        .post("/product/save", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["allDate", "store", "createdDate"],
      });
      setLoading(false);
      reset();
      setImageFile(null);
      setImagePreview(null);
      toast({
        position: "top",
        title: "Success!",
        description: response,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      setLoading(false);

      if (error.response?.data.errorMessage) {
        toast({
          title: "Error uploading image.",
          description: error.response.data.errorMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      if (error.response?.data.productName) {
        setError("productName", {
          type: "server",
          message: error.response.data.productName,
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

  const onSubmit: SubmitHandler<SaveProductProps> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append(
      "product",
      new Blob(
        [
          JSON.stringify({
            category: data.category,
            productName: data.productName,
            description: data.description,
            inventories: data.inventories,
          }),
        ],
        { type: "application/json" }
      )
    );
    Array.from(data.file).forEach((file) => {
      formData.append("file", file);
    });

    await mutation.mutate(formData);
  };

  return {
    loading,
    onSubmit,
    register,
    handleSubmit,
    imageFile,
    setImageFile,
    setValue,
    setImagePreview,
    imagePreview,
    control,
  };
};

export default useSaveProduct;
