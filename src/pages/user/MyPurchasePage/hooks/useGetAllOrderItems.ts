import { useInfiniteQuery } from "@tanstack/react-query";
import OrderItemResponse from "../../../../entities/Order";
import { axiosInstance } from "../../../../services/api-client";
import { useUserStore } from "../../../../store/user-store";

const apiClient = axiosInstance;

export interface PaginateProps {
  pageSize: number;
  status?: string;
}

const useGetAllOrderItems = ({ pageSize, status }: PaginateProps) => {
  const { userId } = useUserStore();
  const id = userId ?? 0;
  return useInfiniteQuery<OrderItemResponse, Error>({
    queryKey: ["allOrders", status],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<OrderItemResponse>(`/order`, {
        params: {
          pageNo: pageParam,
          pageSize: pageSize,
          userId: id,
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
    enabled: !!id,
  });
};

export default useGetAllOrderItems;
