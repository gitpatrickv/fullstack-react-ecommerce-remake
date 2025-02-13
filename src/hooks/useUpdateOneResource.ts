import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../services/api-client";
import { ModuleProps } from "./useSaveResource";

const apiClient = axiosInstance;

const useUpdateOneResource = <T>({ module }: ModuleProps) => {
  const [loading, setLoading] = useState(false);
  const mutation = useMutation<T, Error, T>({
    mutationFn: (data: T) =>
      apiClient
        .put(`/factory/${module}/update`, JSON.stringify(data))
        .then((res) => res.data),
  });
  return {
    loading,
    mutation,
    setLoading,
  };
};

export default useUpdateOneResource;
