import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../../services/api-client";
import { useAuthQueryStore } from "../../../store/auth-store";

interface FormData {
  email: string;
  password: string;
}

const apiClient = axiosInstance;

const useLogin = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { setJwtToken, setRole, onClose } = useAuthQueryStore();

  const { handleSubmit, setError, reset, control } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      apiClient.post("/auth/login", data).then((res) => res.data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      const jwtToken = response.jwtToken;
      setJwtToken(jwtToken);
      const role = response.role;
      setRole(role);
      reset();
      setLoading(false);
      onClose();
    },
    onError: (error: any) => {
      setLoading(false);

      if (error.response?.data.errorMessage) {
        setError("password", {
          type: "server",
          message: error.response.data.errorMessage,
        });
      }
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    mutation.mutate(data);
  };

  return {
    handleSubmit,
    loading,
    onSubmit,
    control,
  };
};

export default useLogin;
