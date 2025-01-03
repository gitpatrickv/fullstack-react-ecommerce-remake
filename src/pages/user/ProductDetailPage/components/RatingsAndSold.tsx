import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { IoIosStar } from "react-icons/io";

const RatingsAndSold = () => {
  const ratings = [1, 2, 3, 4, 5];
  return (
    <>
      <Flex alignItems="center">
        <Text
          mr="5px"
          textDecoration="underline 1px"
          style={{ textUnderlineOffset: "5px" }}
        >
          4.9
        </Text>
        {ratings.map((s) => (
          <Box key={s} color="#FF5722">
            <IoIosStar />
          </Box>
        ))}
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
          300
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
          50
        </Text>
        <Text>Sold</Text>
      </Flex>
    </>
  );
};

export default RatingsAndSold;
