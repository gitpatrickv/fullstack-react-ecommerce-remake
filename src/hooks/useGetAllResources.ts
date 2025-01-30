import { useInfiniteQuery } from "@tanstack/react-query";
import PageResponse from "../entities/PageResponse";
import { axiosInstance } from "../services/api-client";

const apiClient = axiosInstance;

interface Props {
  module: string;
  pageSize?: number;
  sortBy?: string;
}

const useGetAllResources = <T extends { pageResponse: PageResponse }>({
  module,
  pageSize,
  sortBy,
}: Props) => {
  return useInfiniteQuery<T, Error>({
    queryKey: ["allData", module, pageSize, sortBy],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<T>(`/factory/${module}`, {
        params: {
          pageNo: pageParam,
          pageSize: pageSize,
          sortBy: sortBy,
        },
      });
      return data;
    },
    getNextPageParam: (lastPage: T) => {
      const { pageResponse } = lastPage;
      const { pageNo, totalPages } = pageResponse;
      return pageNo + 1 < totalPages ? pageNo + 1 : undefined;
    },
    initialPageParam: 0,
  });
};

export default useGetAllResources;
