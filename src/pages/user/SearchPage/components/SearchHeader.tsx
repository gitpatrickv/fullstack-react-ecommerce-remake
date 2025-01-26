import { Card, Flex, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

interface Props {
  sortBy: string;
  setSortBy: (value: string) => void;
  ratingFilter: number | null;
  minPrice: number | null;
  maxPrice: number | null;
}

const SearchHeader = ({
  sortBy,
  setSortBy,
  ratingFilter,
  minPrice,
  maxPrice,
}: Props) => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const updateUrl = (value: string) => {
    let newUrl = `/search?keyword=${encodeURIComponent(
      keyword
    )}&sortBy=${encodeURIComponent(value)}`;

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
          onClick={() => updateUrl("productName")}
          {...buttonStyle("productName", sortBy)}
        >
          Relevance
        </Card>
        <Card
          onClick={() => updateUrl("createdDate")}
          {...buttonStyle("createdDate", sortBy)}
        >
          Latest
        </Card>
        <Card
          onClick={() => updateUrl("totalSold")}
          {...buttonStyle("totalSold", sortBy)}
        >
          Top Sales
        </Card>
      </Flex>
    </Card>
  );
};

export default SearchHeader;
