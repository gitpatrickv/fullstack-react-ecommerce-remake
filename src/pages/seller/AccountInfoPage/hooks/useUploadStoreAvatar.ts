import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

interface Props {
  file: File;
}

const useUploadStoreAvatar = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, Props>({
    mutationFn: async ({ file }: Props) => {
      const formData = new FormData();
      formData.append("file", file);

      await apiClient.post("/store/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["store"],
      });
    },
    onError: (error: any) => {
      if (error.response?.data.errorMessage) {
        toast({
          title: "Error uploading image.",
          description: error.response.data.errorMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
  });

  return mutation;
};

export default useUploadStoreAvatar;
