import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import GetAllProductResponse from "../entities/Product";
import { axiosInstance } from "../services/api-client";

const apiClient = axiosInstance;

interface Props {
  module: string;
  pageSize: number;
  sortBy: string;
}

const useGetAll = ({ module, pageSize, sortBy }: Props) => {
  return useInfiniteQuery<GetAllProductResponse, Error>({
    queryKey: ["allData", module, pageSize, sortBy],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<GetAllProductResponse>(
        `/factory/${module}`,
        {
          params: {
            pageNo: pageParam,
            pageSize: pageSize,
            sortBy: sortBy,
          },
        }
      );
      return data;
    },
    getNextPageParam: (lastPage) => {
      const { pageResponse } = lastPage;
      const { pageNo, totalPages } = pageResponse;
      return pageNo + 1 < totalPages ? pageNo + 1 : undefined;
    },
    placeholderData: keepPreviousData,
    initialPageParam: 0,
  });
};

export default useGetAll;
