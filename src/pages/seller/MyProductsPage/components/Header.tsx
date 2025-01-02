import { Box, Button, Card, Divider, Text } from "@chakra-ui/react";

interface Props {
  sortBy: string;
  setSortBy: (value: string) => void;
}

const Header = ({ sortBy, setSortBy }: Props) => {
  const handleSortClick = (value: string) => {
    setSortBy(value);
  };

  const buttonStyle = (value: string, sortBy: string) => {
    return {
      width: "120px",
      color: sortBy === value ? "#FF5722" : "white.500",
      border: sortBy === value ? "1px solid #FF5722" : "none",
      _hover: { color: "#E64A19" },
      _active: { color: "none" },
      borderRadius: "20px",
      mr: "10px",
    };
  };
  return (
    <Card borderRadius="none">
      <Box padding={5}>
        <Text fontSize="xl" fontWeight="semibold" color="#FF5722">
          My Products
        </Text>
        <Divider mb="15px" mt="15px" />
        <Box display="flex" alignItems="center">
          <Text
            fontSize="xl"
            fontWeight="semibold"
            mr="20px"
            whiteSpace="nowrap"
          >
            Sort By
          </Text>
          <Button
            onClick={() => handleSortClick("createdDate")}
            {...buttonStyle("createdDate", sortBy)}
          >
            Latest
          </Button>
          <Button
            onClick={() => handleSortClick("totalSold")}
            {...buttonStyle("totalSold", sortBy)}
          >
            Top Sales
          </Button>
          <Button
            onClick={() => handleSortClick("lowProductSold")}
            {...buttonStyle("lowProductSold", sortBy)}
          >
            Low Sales
          </Button>
          <Button
            onClick={() => handleSortClick("productName")}
            {...buttonStyle("productName", sortBy)}
          >
            Name
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default Header;
