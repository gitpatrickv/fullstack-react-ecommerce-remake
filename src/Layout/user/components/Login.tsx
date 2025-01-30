import OrangeButton from "../../../components/Button/OrangeButton";
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
      <OrangeButton
        type={"submit"}
        width="100%"
        mt={4}
        isLoading={loading}
        mb="20px"
      >
        Log In
      </OrangeButton>
    </form>
  );
};

export default Login;
