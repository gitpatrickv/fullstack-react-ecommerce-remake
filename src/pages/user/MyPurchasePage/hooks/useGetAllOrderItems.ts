import { useInfiniteQuery } from "@tanstack/react-query";
import OrderItemResponse from "../../../../entities/Order";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

export interface PaginateProps {
  pageSize: number;
}

const useGetAllOrderItems = ({ pageSize }: PaginateProps) => {
  return useInfiniteQuery<OrderItemResponse, Error>({
    queryKey: ["allOrders", pageSize],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<OrderItemResponse>(`/order`, {
        params: {
          pageNo: pageParam,
          pageSize: pageSize,
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
  });
};

export default useGetAllOrderItems;
