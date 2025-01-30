import { Box, Center, SimpleGrid, Skeleton } from "@chakra-ui/react";

const LoadingSkeleton = () => {
  const array = [1, 2, 3, 4, 5, 6];
  return (
    <Center mt="10px">
      <Box minWidth="1200px" maxWidth="1200px">
        <Skeleton height="250px" />
        <Skeleton height="350px" mt="10px" />
        <Skeleton height="60px" mt="10px" />
        <SimpleGrid columns={{ base: 6 }} spacing={2} mt="10px">
          {array.map((arr) => (
            <Skeleton key={arr} height="250px" />
          ))}
        </SimpleGrid>
      </Box>
    </Center>
  );
};

export default LoadingSkeleton;
