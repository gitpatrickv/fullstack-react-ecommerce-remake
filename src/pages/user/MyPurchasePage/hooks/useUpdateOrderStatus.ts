import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
import { useDisclosure } from "@chakra-ui/react";

interface ChangeStatusProps {
  orderId: number;
  status: string;
}

const apiClient = axiosInstance;

const useUpdateOrderStatus = ({ orderId, status }: ChangeStatusProps) => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = useMutation({
    mutationFn: () => apiClient.post(`/order/${orderId}/${status}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allOrders"],
      });
    },
  });

  return { mutation, isOpen, onClose, onOpen };
};

export default useUpdateOrderStatus;
