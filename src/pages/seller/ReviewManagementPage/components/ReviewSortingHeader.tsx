import { Card, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  sortBy: string;
  sortDirection: string;
}

const ReviewSortingHeader = ({ sortBy, sortDirection }: Props) => {
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
    <Card borderRadius="none" padding={4}>
      <Flex alignItems="center">
        <Text fontSize="lg" fontWeight="semibold" mr="20px">
          Sort By
        </Text>
        <Card {...buttonStyle("productName", sortBy)}>All</Card>
        <Card {...buttonStyle("createdDate", sortBy)}>To Reply</Card>
        <Card {...buttonStyle("totalSold", sortBy)}>Replied</Card>
      </Flex>
    </Card>
  );
};

export default ReviewSortingHeader;
