import { Box, Card, Center, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import FollowingCard from "./components/FollowingCard";
import useGetAllFollowedStores from "./hooks/useGetAllFollowedStores";

const MyFollowingPage = () => {
  const { data, isLoading } = useGetAllFollowedStores();

  if (isLoading) {
    return (
      <Center height="70vh">
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <Card borderRadius="none" mb="10px">
        <Box padding="17px">
          <Text fontSize="xl" fontWeight="semibold">
            My Following
          </Text>
        </Box>
      </Card>
      <SimpleGrid columns={{ base: 2 }} spacing={2}>
        {data?.map((list) => (
          <FollowingCard key={list.storeId} list={list} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default MyFollowingPage;
