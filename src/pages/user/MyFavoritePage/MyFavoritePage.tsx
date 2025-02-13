import { Box, Card, Center, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../../../components/product/ProductCard";
import useGetFavorites from "./hooks/useGetFavorites";

const MyFavoritePage = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetFavorites({
    pageSize: 15,
  });
  const favoriteLength =
    data?.pages?.flatMap((page) => page.models).length || 0;
  const fetchProductData =
    data?.pages.reduce((total, page) => total + page.models.length, 0) || 0;

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
            My Favorites
          </Text>
        </Box>
      </Card>
      {favoriteLength < 1 ? (
        <Center height="50vh">
          <Text fontSize="x-large" fontWeight="semibold">
            Your favorite products will appear here.
          </Text>
        </Center>
      ) : (
        <InfiniteScroll
          dataLength={fetchProductData}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<Spinner />}
        >
          <SimpleGrid columns={{ base: 5 }} spacing={2}>
            {data?.pages.map((page) =>
              page.models.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))
            )}
          </SimpleGrid>
        </InfiniteScroll>
      )}
    </>
  );
};

export default MyFavoritePage;
