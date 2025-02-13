import { Card, Flex, Text } from "@chakra-ui/react";
import useSortingButtonStyle from "../../hooks/useSortingButtonStyle";

interface Props {
  sortBy: string;
  sortDirection: string;
  setSortBy: (value: string) => void;
  setSortDirection: (value: string) => void;
  ratingFilter: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  urlParam: string;
  category?: string;
}

const SortingHeader = ({
  sortBy,
  sortDirection,
  setSortBy,
  setSortDirection,
  ratingFilter,
  minPrice,
  maxPrice,
  urlParam,
  category,
}: Props) => {
  const updateUrl = (sortBy: string, direction: string) => {
    let newUrl = `${urlParam}&sortBy=${encodeURIComponent(
      sortBy
    )}&dir=${direction}`;

    if (ratingFilter) {
      newUrl += `&ratingFilter=${ratingFilter.toString()}`;
    }

    if (minPrice) {
      newUrl += `&minPrice=${minPrice.toString()}`;
    }

    if (maxPrice) {
      newUrl += `&maxPrice=${maxPrice.toString()}`;
    }

    if (category) {
      newUrl += `&category=${encodeURIComponent(category)}`;
    }

    window.history.pushState(null, "", newUrl);
    setSortBy(sortBy);
    setSortDirection(direction);
  };

  const { buttonStyle } = useSortingButtonStyle();

  return (
    <Card borderRadius="none" padding={4}>
      <Flex alignItems="center">
        <Text fontSize="lg" fontWeight="semibold" mr="20px">
          Sort By
        </Text>
        <Card
          onClick={() => updateUrl("productName", "ASC")}
          {...buttonStyle("productName", sortBy, sortDirection, "ASC")}
        >
          A-Z
        </Card>
        <Card
          onClick={() => updateUrl("createdDate", "DESC")}
          {...buttonStyle("createdDate", sortBy, sortDirection, "DESC")}
        >
          Latest
        </Card>
        <Card
          onClick={() => updateUrl("totalSold", "DESC")}
          {...buttonStyle("totalSold", sortBy, sortDirection, "DESC")}
        >
          Top Sales
        </Card>
      </Flex>
    </Card>
  );
};

export default SortingHeader;
