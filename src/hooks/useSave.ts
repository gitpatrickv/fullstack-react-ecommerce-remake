import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../services/api-client";
import { Store } from "../entities/Store";

const apiClient = axiosInstance;

interface Props {
  module: string;
}

type FormData = Store;

const useSave = ({ module }: Props) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, setError, reset, control } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      apiClient
        .post(`/${module}`, JSON.stringify(data))
        .then((res) => res.data),

    // onSuccess: (response) => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["user"],
    //   });
    //   setLoading(false);
    //   reset();
    // },
    // onError: (error: any) => {
    //   setLoading(false);

    //   if (error.response?.data.storeName) {
    //     setError("storeName", {
    //       type: "server",
    //       message: error.response.data.storeName,
    //     });
    //   }
    //   if (error.response?.data.contactNumber) {
    //     setError("contactNumber", {
    //       type: "server",
    //       message: error.response.data.contactNumber,
    //     });
    //   }
    // },
  });

  // const onSubmit: SubmitHandler<FormData> = (data) => {
  //   setLoading(true);
  //   mutation.mutate(data);
  // };

  return {
    handleSubmit,
    loading,
    // onSubmit,
    control,
    mutation,
    setLoading,
    setError,
  };
};

export default useSave;
