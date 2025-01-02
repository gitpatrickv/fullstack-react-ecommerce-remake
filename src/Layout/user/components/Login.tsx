import { Button } from "@chakra-ui/react";
import PasswordInput from "../../../components/Input/PasswordInput";
import TextInput from "../../../components/Input/TextInput";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const {
    handleSubmit,
    loading,
    onSubmit: onSubmitLogin,
    control,
  } = useLogin();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(onSubmitLogin)(event);
      }}
    >
      <TextInput
        control={control}
        name="email"
        loading={loading}
        placeholder="Email"
        label="Email"
        mb={4}
      />
      <PasswordInput
        control={control}
        name="password"
        loading={loading}
        placeholder="Password"
        label="Password"
      />
      <Button
        isLoading={loading}
        type="submit"
        width="100%"
        bg="#FF5722"
        _hover={{ bg: "#E64A19" }}
        mb="20px"
        mt={4}
      >
        Log In
      </Button>
    </form>
  );
};

export default Login;
