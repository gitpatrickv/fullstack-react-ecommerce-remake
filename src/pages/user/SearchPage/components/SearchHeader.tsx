import { Card, Flex, Text } from "@chakra-ui/react";

interface Props {
  sortBy: string;
  setSortBy: (value: string) => void;
}

const SearchHeader = ({ sortBy, setSortBy }: Props) => {
  const handleSortClick = (value: string) => {
    setSortBy(value);
  };

  const buttonStyle = (value: string, sortBy: string) => {
    return {
      width: "120px",
      bg: sortBy === value ? "#E64A19" : "white",
      color: sortBy === value ? "white" : "black",
      _hover: { bg: sortBy === value ? "#E64A19" : "white" },
      _active: { bg: sortBy === value ? "#E64A19" : "white" },
      mr: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      borderRadius: "none",
      height: "40px",
      userSelect: "none" as "none",
    };
  };
  return (
    <Card borderRadius="none" padding={4} bg="#F8F8F8">
      <Flex alignItems="center">
        <Text fontSize="lg" fontWeight="semibold" mr="20px">
          Sort By
        </Text>
        <Card
          onClick={() => handleSortClick("productName")}
          {...buttonStyle("productName", sortBy)}
        >
          Relevance
        </Card>
        <Card
          onClick={() => handleSortClick("createdDate")}
          {...buttonStyle("createdDate", sortBy)}
        >
          Latest
        </Card>
        <Card
          onClick={() => handleSortClick("totalSold")}
          {...buttonStyle("totalSold", sortBy)}
        >
          Top Sales
        </Card>
      </Flex>
    </Card>
  );
};

export default SearchHeader;
