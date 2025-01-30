import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { Inventory } from "../../../../entities/Inventory";
import { formatCurrency } from "../../../../utilities/formatCurrency";
interface Props {
  inventory: Inventory;
}

const InventoryList = ({ inventory }: Props) => {
  return (
    <>
      <Grid
        templateColumns="0.2fr 0.2fr 0.2fr 0.2fr 0.2fr"
        templateAreas={`"content1 content2 content3 content4 content5"`}
        py={3}
      >
        <GridItem area="content1">
          <Box>
            <Text
              textAlign="center"
              color={inventory.quantity > 0 ? "white.500" : "red"}
            >
              {inventory.quantity}
            </Text>
          </Box>
        </GridItem>
        <GridItem area="content2">
          <Text textAlign="center">{formatCurrency(inventory.price)}</Text>
        </GridItem>
        <GridItem area="content3">
          <Text textAlign="center">{inventory.color}</Text>
        </GridItem>
        <GridItem area="content4">
          <Text textAlign="center">{inventory.size}</Text>
        </GridItem>
        <GridItem area="content5">
          <Flex gap={2} justifyContent="center">
            <FiEdit size="25px" />
            <IoMdAdd size="25px" />
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};

export default InventoryList;
