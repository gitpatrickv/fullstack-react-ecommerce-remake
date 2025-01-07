import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
import { useToast } from "@chakra-ui/react";

interface Props {
  file: File;
}

const apiClient = axiosInstance;

const useUploadUserAvatar = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, Props>({
    mutationFn: async ({ file }: Props) => {
      const formData = new FormData();
      formData.append("file", file);

      await apiClient.post("/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
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

export default useUploadUserAvatar;
