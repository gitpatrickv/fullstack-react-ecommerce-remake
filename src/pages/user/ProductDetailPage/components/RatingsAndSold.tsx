import { Divider, Flex, Text } from "@chakra-ui/react";
import StarRating from "../../../../components/product/StarRating";
interface Props {
  totalSold: number;
  averageRating: number;
  reviewsCount: number;
}

const RatingsAndSold = ({ totalSold, averageRating, reviewsCount }: Props) => {
  return (
    <>
      <Flex alignItems="center">
        <Text
          mr="5px"
          textDecoration="underline 1px"
          style={{ textUnderlineOffset: "5px" }}
        >
          {averageRating}
        </Text>
        <StarRating averageRating={averageRating} />
        <Divider
          orientation="vertical"
          ml="10px"
          mr="10px"
          borderColor="gray"
        />
        <Text
          mr="5px"
          textDecoration="underline 1px"
          style={{ textUnderlineOffset: "5px" }}
        >
          {reviewsCount}
        </Text>
        <Text>Ratings</Text>
        <Divider
          orientation="vertical"
          ml="10px"
          mr="10px"
          borderColor="gray"
        />
        <Text
          mr="5px"
          textDecoration="underline 1px"
          style={{ textUnderlineOffset: "5px" }}
        >
          {totalSold}
        </Text>
        <Text>Sold</Text>
      </Flex>
    </>
  );
};

export default RatingsAndSold;
