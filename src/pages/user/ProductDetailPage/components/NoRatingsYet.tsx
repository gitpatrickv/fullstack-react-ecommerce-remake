import { Center, Text } from "@chakra-ui/react";
import { TbStarOff } from "react-icons/tb";

const NoRatingsYet = () => {
  return (
    <Center height="400px" flexDirection="column">
      <TbStarOff size="100px" />
      <Text fontSize="xl" mt="10px" fontWeight="semibold">
        No Ratings Yet
      </Text>
    </Center>
  );
};

export default NoRatingsYet;
