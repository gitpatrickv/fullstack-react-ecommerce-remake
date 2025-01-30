import {
  Box,
  FormControl,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import OrangeButton from "../../../components/Button/OrangeButton";
import PasswordInput from "../../../components/Input/PasswordInput";
import TextInput from "../../../components/Input/TextInput";
import useRegister from "../hooks/useRegister";

const Register = () => {
  const [selectedGender, setSelectedGender] = useState<string>("");
  const handleSelectedGenderClick = (value: string) => {
    setSelectedGender(value);
  };

  const { handleSubmit, loading, onSubmit, control } = useRegister();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(onSubmit)(event);
      }}
    >
      <Stack spacing={3}>
        <TextInput
          control={control}
          name="name"
          loading={loading}
          placeholder="Full Name"
          label="full name"
        />
        <TextInput
          control={control}
          name="email"
          loading={loading}
          placeholder="Email"
          label="email"
        />
        <PasswordInput
          control={control}
          name="password"
          loading={loading}
          placeholder="Password"
          label="Password"
        />
        <PasswordInput
          control={control}
          name="confirmPassword"
          loading={loading}
          placeholder="Confirm Password"
          label="Confirm Password"
        />
        <FormControl isRequired>
          <Text fontSize="xs" mb="2px">
            Gender
          </Text>
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <RadioGroup
                onChange={(value) => {
                  handleSelectedGenderClick(value);
                  field.onChange(value);
                }}
                value={selectedGender}
              >
                <Box display="flex" flexDirection="row">
                  <Radio value="MALE" mr="30px">
                    Male
                  </Radio>
                  <Radio value="FEMALE">Female</Radio>
                </Box>
              </RadioGroup>
            )}
          />
        </FormControl>
        <OrangeButton
          type={"submit"}
          width="100%"
          mt="10px"
          isLoading={loading}
          mb="20px"
        >
          Register
        </OrangeButton>
      </Stack>
    </form>
  );
};

export default Register;
