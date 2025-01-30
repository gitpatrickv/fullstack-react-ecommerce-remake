import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  IconButton,
  Input,
  Select,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { SaveProductProps } from "../hooks/useSaveProduct";

interface Props {
  register: UseFormRegister<SaveProductProps>;
  control: Control<SaveProductProps>;
}

const Variation = ({ register, control }: Props) => {
  const [isVariation, setIsVariation] = useState<boolean>(false);
  const [isColorsAndSizes, setIsColorsAndSizes] = useState<boolean>(false);

  const colors = [
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Orange",
    "Purple",
    "Pink",
    "Black",
    "White",
    "Gray",
    "Brown",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const {
    fields: variationFields,
    append: appendVariation,
    remove: removeVariation,
  } = useFieldArray({
    control,
    name: "inventories",
  });

  const handleEnableVariationCheckBoxChange = () => {
    const variation = !isVariation;
    setIsVariation(variation);
    if (variation) {
      removeVariation();
    }
  };

  return (
    <>
      <Box display="flex" mt="20px" alignItems="center" mr="10px">
        <Checkbox
          size="lg"
          colorScheme="green"
          isChecked={isVariation}
          onChange={handleEnableVariationCheckBoxChange}
        />
        <Text fontSize="large" ml="5px" color="white.500">
          Enable Variation
        </Text>
      </Box>
      {isVariation ? (
        <>
          {variationFields.length === 0 ? (
            ""
          ) : (
            <>
              <Box display="flex" mt="10px" alignItems="center">
                <Checkbox
                  size="lg"
                  colorScheme="green"
                  isChecked={isColorsAndSizes}
                  onChange={() => setIsColorsAndSizes(!isColorsAndSizes)}
                />
                <Text fontSize="large" ml="5px" color="white.500">
                  Colors and Sizes
                </Text>
              </Box>
              <Box display="flex" textAlign="center" mt="10px" mb="10px">
                <Text fontSize="large">Variation</Text>
                <Spacer />
                <Text fontSize="large" mr="20px">
                  Size
                </Text>
                <Spacer />
                <Text fontSize="large" mr="30px" ml="15px">
                  Price
                </Text>
                <Spacer />
                <Text fontSize="large" mr="35px">
                  Quantity
                </Text>
                <Spacer />
              </Box>
            </>
          )}

          {variationFields.map((field, index) => (
            <HStack key={field.id} spacing={4} mb="10px">
              {isColorsAndSizes ? (
                <>
                  <Select {...register(`inventories.${index}.color`)}>
                    {colors.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                  <Select {...register(`inventories.${index}.size`)}>
                    {sizes.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </>
              ) : (
                <>
                  <Input
                    placeholder="Variation"
                    {...register(`inventories.${index}.color`)}
                  />
                  <Input
                    placeholder="Size"
                    {...register(`inventories.${index}.size`)}
                  />
                </>
              )}

              <Input
                type="number"
                placeholder="Price"
                {...register(`inventories.${index}.price`, {
                  required: true,
                })}
              />
              <Input
                type="number"
                placeholder="Quantity"
                {...register(`inventories.${index}.quantity`, {
                  required: true,
                })}
              />
              <IconButton
                aria-label="Remove variation"
                icon={<DeleteIcon />}
                onClick={() => removeVariation(index)}
              />
            </HStack>
          ))}
          <Button
            mt="15px"
            leftIcon={<AddIcon />}
            _hover={{ color: "orange.400" }}
            onClick={() =>
              appendVariation({
                size: "",
                color: "",
                price: 0,
                quantity: 0,
              })
            }
          >
            Add Variation
          </Button>
        </>
      ) : (
        <>
          <Box mt="10px">
            <Text fontSize="large" mb="5px">
              Price
            </Text>
            <Input
              maxWidth="20%"
              mb="10px"
              type="number"
              placeholder="Price"
              {...register(`inventories.0.price`, {
                required: "Price is required",
                min: { value: 1, message: "Price must be at least 1" },
              })}
            />
            <Text fontSize="large" mb="5px">
              Quantity
            </Text>
            <Input
              maxWidth="20%"
              mb="10px"
              type="number"
              placeholder="Quantity"
              {...register(`inventories.0.quantity`, {
                required: "Quantity is required",
                min: {
                  value: 1,
                  message: "Quantity must be at least 1",
                },
              })}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default Variation;
