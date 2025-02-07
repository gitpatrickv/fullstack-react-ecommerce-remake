import { Box, Card, Divider, Text } from "@chakra-ui/react";
import useSortingButtonStyle from "../../../../hooks/useSortingButtonStyle";

interface Props {
  sortBy: string;
  setSortBy: (value: string) => void;
  sortDirection: string;
  setSortDirection: (value: string) => void;
}

const Header = ({
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
}: Props) => {
  const handleSortClick = (value: string, dirValue: string) => {
    setSortBy(value);
    setSortDirection(dirValue);
  };

  const { buttonStyle } = useSortingButtonStyle();

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
          <Card
            onClick={() => handleSortClick("createdDate", "DESC")}
            {...buttonStyle("createdDate", sortBy, sortDirection, "DESC")}
          >
            Latest
          </Card>
          <Card
            onClick={() => handleSortClick("totalSold", "DESC")}
            {...buttonStyle("totalSold", sortBy, sortDirection, "DESC")}
          >
            Top Sales
          </Card>
          <Card
            onClick={() => handleSortClick("productName", "ASC")}
            {...buttonStyle("productName", sortBy, sortDirection, "ASC")}
          >
            A-Z
          </Card>
        </Box>
      </Box>
    </Card>
  );
};

export default Header;
