import { Button, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
}

const WhiteButton = ({ children, type, ...props }: Props) => {
  return (
    <Button
      borderRadius="none"
      alignItems="center"
      justifyContent="center"
      border="1px solid"
      cursor="pointer"
      width="130px"
      bg="white"
      borderColor="#DCDCDC"
      _hover={{ bg: "#F8F8F8" }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default WhiteButton;
