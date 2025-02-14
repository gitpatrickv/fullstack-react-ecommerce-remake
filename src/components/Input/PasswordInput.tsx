import {
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useController } from "react-hook-form";
import { MdLockOpen, MdLockOutline } from "react-icons/md";
import { TextInputProps } from "./TextInput";

const PasswordInput = ({
  control,
  name,
  loading,
  placeholder,
  ...props
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const {
    formState: { errors },
  } = useController({ control, name });

  return (
    <FormControl isRequired>
      <InputGroup>
        <Input
          {...control.register(name)}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={loading}
          {...props}
          borderRadius="none"
        />
        <InputRightElement>
          <IconButton
            aria-label="password"
            icon={
              showPassword ? (
                <MdLockOpen size="25px" />
              ) : (
                <MdLockOutline size="25px" />
              )
            }
            onClick={handleShowPasswordClick}
            bg="transparent"
            _hover={{ bg: "transparent" }}
          />
        </InputRightElement>
      </InputGroup>
      {errors[name] && (
        <Text color="red">{errors[name].message?.toString()}</Text>
      )}
    </FormControl>
  );
};

export default PasswordInput;
