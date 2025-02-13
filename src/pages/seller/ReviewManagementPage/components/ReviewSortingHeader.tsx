import { Card, Flex, Text } from "@chakra-ui/react";
import useSortingButtonStyle from "../../../../hooks/useSortingButtonStyle";

interface Props {
  sortBy: string;
  setSortBy: (value: string) => void;
  sortDirection: string;
  setSortDirection: (value: string) => void;
}

const ReviewSortingHeader = ({
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
}: Props) => {
  const handleSortingClick = (sortBy: string, sortDirection: string) => {
    setSortBy(sortBy);
    setSortDirection(sortDirection);
  };

  const { buttonStyle } = useSortingButtonStyle();

  return (
    <Card borderRadius="none" padding={4}>
      <Flex alignItems="center">
        <Text fontSize="lg" fontWeight="semibold" mr="20px">
          Sort By
        </Text>

        <Card
          {...buttonStyle("createdDate", sortBy, sortDirection, "DESC")}
          onClick={() => handleSortingClick("createdDate", "DESC")}
        >
          Latest
        </Card>
        <Card
          {...buttonStyle("sellerResponse", sortBy, sortDirection, "ASC")}
          onClick={() => handleSortingClick("sellerResponse", "ASC")}
        >
          To Reply
        </Card>
        <Card
          {...buttonStyle("sellerResponse", sortBy, sortDirection, "DESC")}
          onClick={() => handleSortingClick("sellerResponse", "DESC")}
        >
          Replied
        </Card>
      </Flex>
    </Card>
  );
};

export default ReviewSortingHeader;
