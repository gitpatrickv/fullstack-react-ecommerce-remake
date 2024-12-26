import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { User, schema } from "../../../entities/User";
import { axiosInstance } from "../../../services/api-client";
import { useAuthQueryStore } from "../../../store/auth-store";

const apiClient = axiosInstance;

const useRegister = () => {
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
      // queryClient.invalidateQueries(["user"]);
      const jwtToken = response.jwtToken;
      setJwtToken(jwtToken);
      const role = response.role;
      setRole(role);
      onClose();
    },
    onError: (error: any) => {
      setLoading(false);
      if (error.response?.data.email) {
        setError("email", {
          type: "server",
          message: error.response.data.email,
        });
      }
      if (error.response?.data.name) {
        setError("name", {
          type: "server",
          message: error.response.data.name,
        });
      }
      if (error.response?.data.password) {
        setError("password", {
          type: "server",
          message: error.response.data.password,
        });
      }
      if (error.response?.data.userModel) {
        setError("confirmPassword", {
          type: "server",
          message: error.response.data.userModel,
        });
      }
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
