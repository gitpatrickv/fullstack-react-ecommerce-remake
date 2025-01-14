import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
import { IdSetProps } from "../../CartPage/hooks/useDeleteAllSelectedItem";

const apiClient = axiosInstance;

export interface CartTotalProps {
  totalAmount: number;
  totalItems: number;
}

const useGetCartTotal = ({ ids }: IdSetProps) => {
  return useQuery({
    queryKey: ["cartTotal", ids],
    queryFn: async () => {
      const { data } = await apiClient.get<CartTotalProps>(
        `/cart/${ids}/total`
      );
      return data;
    },
    enabled: ids.length > 0,
  });
};

export default useGetCartTotal;
