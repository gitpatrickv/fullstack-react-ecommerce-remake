import { Card, Flex, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

interface Props {
  sortBy: string;
  setSortBy: (value: string) => void;
  setSortDirection: (value: string) => void;
  ratingFilter: number | null;
  minPrice: number | null;
  maxPrice: number | null;
}

const SearchHeader = ({
  sortBy,
  setSortBy,
  setSortDirection,
  ratingFilter,
  minPrice,
  maxPrice,
}: Props) => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const updateUrl = (sortBy: string, direction: string) => {
    let newUrl = `/search?keyword=${encodeURIComponent(
      keyword
    )}&sortBy=${encodeURIComponent(sortBy)}&dir=${direction}`;

    if (ratingFilter) {
      newUrl += `&ratingFilter=${ratingFilter.toString()}`;
    }

    if (minPrice) {
      newUrl += `&minPrice=${minPrice.toString()}`;
    }

    if (maxPrice) {
      newUrl += `&maxPrice=${maxPrice.toString()}`;
    }

    window.history.pushState(null, "", newUrl);
    setSortBy(sortBy);
    setSortDirection(direction);
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
          onClick={() => updateUrl("productName", "ASC")}
          {...buttonStyle("productName", sortBy)}
        >
          Relevance
        </Card>
        <Card
          onClick={() => updateUrl("createdDate", "DESC")}
          {...buttonStyle("createdDate", sortBy)}
        >
          Latest
        </Card>
        <Card
          onClick={() => updateUrl("totalSold", "DESC")}
          {...buttonStyle("totalSold", sortBy)}
        >
          Top Sales
        </Card>
      </Flex>
    </Card>
  );
};

export default SearchHeader;
