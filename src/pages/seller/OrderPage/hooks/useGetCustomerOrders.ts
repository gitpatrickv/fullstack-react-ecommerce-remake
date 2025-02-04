import { useInfiniteQuery } from "@tanstack/react-query";
import OrderItemResponse from "../../../../entities/Order";
import { axiosInstance } from "../../../../services/api-client";
import { useShopStore } from "../../../../store/shop-store";
import { PaginateProps } from "../../../user/MyPurchasePage/hooks/useGetAllOrderItems";

const apiClient = axiosInstance;

const useGetCustomerOrders = ({ pageSize, status }: PaginateProps) => {
  const { storeId } = useShopStore();

  return useInfiniteQuery<OrderItemResponse, Error>({
    queryKey: ["allOrders", status],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<OrderItemResponse>(`/order`, {
        params: {
          pageNo: pageParam,
          pageSize: pageSize,
          storeId: storeId ?? 0,
          status: status,
        },
      });
      return data;
    },
    getNextPageParam: (lastPage) => {
      const { pageResponse } = lastPage;
      const { pageNo, totalPages } = pageResponse;
      return pageNo + 1 < totalPages ? pageNo + 1 : undefined;
    },
    initialPageParam: 0,
    enabled: !!storeId,
  });
};

export default useGetCustomerOrders;
