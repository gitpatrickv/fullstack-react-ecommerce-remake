import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../services/api-client";

const apiClient = axiosInstance;

export interface ModuleProps {
  module: string;
}

const useSave = <T>({ module }: ModuleProps) => {
  const [loading, setLoading] = useState(false);

  const mutation = useMutation<T, Error, T>({
    mutationFn: (data: T) =>
      apiClient
        .post(`/factory/${module}`, JSON.stringify(data))
        .then((res) => res.data),
  });

  return {
    loading,
    mutation,
    setLoading,
  };
};

export default useSave;
