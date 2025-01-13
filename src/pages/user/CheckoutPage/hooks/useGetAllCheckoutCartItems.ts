import { useQuery } from "@tanstack/react-query";
import { CheckoutResponse } from "../../../../entities/CartItem";
import { axiosInstance } from "../../../../services/api-client";
import { IdSetProps } from "../../CartPage/hooks/useDeleteAllSelectedItem";

const apiClient = axiosInstance;

const useGetAllCheckoutCartItems = ({ ids }: IdSetProps) => {
  return useQuery({
    queryKey: ["checkout", ids],
    queryFn: async () => {
      const { data } = await apiClient.get<CheckoutResponse>(
        `/cart/${ids}/checkout`
      );
      return data;
    },
    enabled: ids.length > 0,
  });
};

export default useGetAllCheckoutCartItems;
