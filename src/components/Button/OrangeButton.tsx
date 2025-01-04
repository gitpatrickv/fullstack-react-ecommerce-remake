import { Button, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
}

const OrangeButton = ({ children, type, ...props }: Props) => {
  return (
    <Button
      bg="#FF5722"
      _hover={{ bg: "#E64A19" }}
      color="white"
      type={type}
      {...props}
      borderRadius="none"
    >
      {children}
    </Button>
  );
};

export default OrangeButton;
