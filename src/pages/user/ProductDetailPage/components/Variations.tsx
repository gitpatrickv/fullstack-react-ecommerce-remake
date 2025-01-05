import { Box, Flex, Text } from "@chakra-ui/react";
import { Inventory } from "../../../../entities/Inventory";

interface Props {
  inventories?: Inventory[];
}

const Variations = ({ inventories }: Props) => {
  const hasColor = inventories?.some((inv) => inv.color);
  const hasSize = inventories?.some((inv) => inv.size);

  if (!hasColor && !hasSize) {
    return <Box height="230px" />;
  }

  const boxStyle = {
    mr: "5px",
    mt: "5px",
    border: "1px solid",
    borderColor: "#E8E8E8",
    padding: "8px",
    minWidth: "100px",
    cursor: "pointer",
    _hover: { borderColor: "#E64A19", color: "#E64A19" },
  };

  return (
    <Box minHeight="230px">
      <Flex mt="10px">
        <Text mr="50px" fontSize="lg" fontWeight="semibold" mt="12px">
          Colors
        </Text>
        <Flex wrap="wrap">
          {Array.from(new Set(inventories?.map((inv) => inv.color))).map(
            (color) => (
              <Box key={color} {...boxStyle} textAlign="center">
                {color}
              </Box>
            )
          )}
        </Flex>
      </Flex>
      <Flex mt="10px">
        <Text mr="62px" fontSize="lg" fontWeight="semibold" mt="12px">
          Sizes
        </Text>
        <Flex wrap="wrap">
          {Array.from(new Set(inventories?.map((inv) => inv.size))).map(
            (size) => (
              <Box key={size} {...boxStyle} textAlign="center">
                {size}
              </Box>
            )
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Variations;
