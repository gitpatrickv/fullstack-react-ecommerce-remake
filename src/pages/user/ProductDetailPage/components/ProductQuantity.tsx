import { Button, Center, Flex, Text } from "@chakra-ui/react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { Inventory } from "../../../../entities/Inventory";

interface Props {
  count: number;
  setCount: (value: number) => void;
  filteredInventory: Inventory | null;
  hasColorsOrSizes: boolean | undefined;
  productQuantity: number;
  isOutOfStock: boolean | undefined;
}

const ProductQuantity = ({
  count,
  setCount,
  filteredInventory,
  hasColorsOrSizes,
  productQuantity,
  isOutOfStock,
}: Props) => {
  const boxStyle = {
    height: "30px",
    width: "20px",
    border: "1px solid",
    borderColor: "#E0E0E0",
    cursor: count === filteredInventory?.quantity ? "not-allowed" : "pointer",
    borderRadius: "none",
    display: "flex",
  };

  return (
    <>
      <Flex mt="10px" mb="10px" alignItems="center" userSelect="none">
        <Text mr="31px" fontSize="lg" fontWeight="semibold">
          Quantity
        </Text>
        <Button
          variant="unstyled"
          {...boxStyle}
          onClick={() => setCount(count - 1)}
          isDisabled={count === 1 ? true : false}
        >
          <FiMinus />
        </Button>
        <Center
          border="1px solid"
          width="60px"
          color="#E64A19"
          height="30px"
          borderColor="#E0E0E0"
          fontWeight="semibold"
        >
          <Text>{isOutOfStock ? 0 : count}</Text>
        </Center>
        <Button
          variant="unstyled"
          {...boxStyle}
          onClick={() => setCount(count + 1)}
          isDisabled={
            (hasColorsOrSizes && count === filteredInventory?.quantity) ||
            (!hasColorsOrSizes && count === productQuantity)
          }
        >
          <GoPlus />
        </Button>
        <Text ml="10px" color={isOutOfStock ? "red" : undefined}>
          {isOutOfStock ? (
            "Out of Stock"
          ) : (
            <>
              {hasColorsOrSizes ? filteredInventory?.quantity : productQuantity}
              <Text as="span" ml="5px">
                piece(s) available
              </Text>
            </>
          )}
        </Text>
      </Flex>
    </>
  );
};

export default ProductQuantity;
