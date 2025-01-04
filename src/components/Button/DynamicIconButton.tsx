import { Box, Card, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  isHover: boolean;
  setIsHover: (value: boolean) => void;
  size: string;
  icon: React.ElementType;
  text: string;
  color: string;
}

const DynamicIconButton = ({
  isHover,
  setIsHover,
  size,
  icon: Icon,
  text,
  color,
}: Props) => {
  return (
    <>
      <Box position="relative">
        {isHover && (
          <Card position="absolute" bottom="30px" left="-10px" padding={2}>
            <Text fontWeight="semibold" color={color}>
              {text}
            </Text>
          </Card>
        )}
        <Box
          cursor="pointer"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Icon size={size} />
        </Box>
      </Box>
    </>
  );
};

export default DynamicIconButton;
