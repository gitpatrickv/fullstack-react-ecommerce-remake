import { useInfiniteQuery } from "@tanstack/react-query";
import OrderItemResponse from "../../../../entities/Order";
import { axiosInstance } from "../../../../services/api-client";
import { PaginateProps } from "../../../user/MyPurchasePage/hooks/useGetAllOrderItems";

const apiClient = axiosInstance;

const useGetCustomerOrders = ({ pageSize, status }: PaginateProps) => {
  return useInfiniteQuery<OrderItemResponse, Error>({
    queryKey: ["customerOrders", status],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<OrderItemResponse>(`/order`, {
        params: {
          pageNo: pageParam,
          pageSize: pageSize,
          isSellerPage: true,
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
  });
};

export default useGetCustomerOrders;
