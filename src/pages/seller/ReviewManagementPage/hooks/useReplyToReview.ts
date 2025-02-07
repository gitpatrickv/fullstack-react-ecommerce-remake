import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;
export interface ReplyToReviewProps {
  productReviewId: number;
  reply: string;
}
const useReplyToReview = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ReplyToReviewProps) => {
      await apiClient.put(`/product/review/reply`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      toast({
        title: "Replied Successfully",
        description: "Thank you for your response!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Reply Failed",
        description: error.response?.data.reply,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    },
  });
};

export default useReplyToReview;
