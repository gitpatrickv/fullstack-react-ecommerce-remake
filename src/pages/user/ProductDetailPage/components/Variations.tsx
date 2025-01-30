import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Inventory } from "../../../../entities/Inventory";

interface Props {
  inventories?: Inventory[];
  color: string;
  setColor: (value: string) => void;
  size: string;
  setSize: (value: string) => void;
  hasColorsOrSizes: boolean | undefined;
}

const Variations = ({
  inventories,
  color,
  setColor,
  size,
  setSize,
  hasColorsOrSizes,
}: Props) => {
  if (!hasColorsOrSizes) {
    return <Box height="230px" />;
  }

  const boxStyle = {
    mr: "5px",
    mt: "5px",
    borderRadius: "none",
    border: "1px solid",
    borderColor: "#E8E8E8",
    minWidth: "100px",
    _hover: { borderColor: "#E64A19", color: "#E64A19" },
  };

  const getAvailableColors = (size: string) => {
    const uniqueColors = new Set<string>();
    inventories?.forEach((inv) => {
      if (inv.size === size && inv.quantity > 0) {
        uniqueColors.add(inv.color || "");
      }
    });
    return Array.from(uniqueColors);
  };

  const getAvailableSizes = (color: string) => {
    const uniqueSizes = new Set<string>();
    inventories?.forEach((inv) => {
      if (inv.color === color && inv.quantity > 0) {
        uniqueSizes.add(inv.size || "");
      }
    });
    return Array.from(uniqueSizes);
  };

  const availableColors = getAvailableColors(size);
  const availableSizes = getAvailableSizes(color);

  return (
    <Box minHeight="230px">
      <Flex mt="10px">
        <Text mr="50px" fontSize="lg" fontWeight="semibold" mt="12px">
          Colors
        </Text>
        <Flex wrap="wrap">
          {Array.from(new Set(inventories?.map((inv) => inv.color))).map(
            (selectedColor) => (
              <Button
                key={selectedColor}
                {...boxStyle}
                variant="unstyled"
                onClick={() => setColor(selectedColor || "")}
                color={color === selectedColor ? "#E64A19" : "white.500"}
                borderColor={color === selectedColor ? "#E64A19" : "#E8E8E8"}
                isDisabled={!availableColors.includes(selectedColor || "")}
              >
                {selectedColor}
              </Button>
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
            (selectedSize) => (
              <Button
                key={selectedSize}
                {...boxStyle}
                variant="unstyled"
                onClick={() => setSize(selectedSize || "")}
                color={size === selectedSize ? "#E64A19" : "white.500"}
                borderColor={size === selectedSize ? "#E64A19" : "#E8E8E8"}
                isDisabled={!availableSizes.includes(selectedSize || "")}
              >
                {selectedSize}
              </Button>
            )
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Variations;
