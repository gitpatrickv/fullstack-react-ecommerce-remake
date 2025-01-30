import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { User, schema } from "../../../entities/User";
import { axiosInstance } from "../../../services/api-client";
import { useAuthQueryStore } from "../../../store/auth-store";

const apiClient = axiosInstance;

const useRegister = () => {
  const errorFields = ["name", "email", "password", "confirmPassword"];
  const queryClient = useQueryClient();
  const { handleSubmit, setError, control } = useForm<User>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const { setJwtToken, setRole, onClose } = useAuthQueryStore();

  const mutation = useMutation({
    mutationFn: (data: User) =>
      apiClient.post("/auth/register", data).then((res) => res.data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      const jwtToken = response.jwtToken;
      setJwtToken(jwtToken);
      const role = response.role;
      setRole(role);
      onClose();
    },
    onError: (error: any) => {
      setLoading(false);
      errorFields.forEach((field: any) => {
        if (error.response?.data[field]) {
          setError(field, {
            type: "server",
            message: error.response.data[field],
          });
        }
      });
    },
  });

  const onSubmit: SubmitHandler<User> = (data) => {
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

export default useRegister;
