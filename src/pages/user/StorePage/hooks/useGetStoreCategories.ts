import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

export type StoreCategoriesProps = { category: string }[];

const useGetStoreCategories = (storeId: string) => {
  return useQuery({
    queryKey: ["StoreCategories", storeId],
    queryFn: async () => {
      const { data } = await apiClient.get<StoreCategoriesProps>(
        `/product/${storeId}/categories`
      );
      return data;
    },
  });
};

export default useGetStoreCategories;
