import { Box, Card, Center, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import ProductCard from "../../../components/product/ProductCard";
import useGetAllProductsByCategory from "./hooks/useGetAllProductsByCategory";
import Banner from "../HomePage/components/Banner";

const ProductCategoryPage = () => {
  const params = useParams<{ category: string }>();
  const category = params.category;
  const formattedCategory = category?.replace(/_/g, " ");
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useGetAllProductsByCategory({
      pageSize: 30,
      category: category!,
    });

  const fetchProductData =
    data?.pages.reduce((total, page) => total + page.models.length, 0) || 0;

  if (isLoading) {
    return (
      <Center height="70vh">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <Center mt="10px">
      <Box minWidth="1200px" maxWidth="1200px">
        <Banner />
        <Card
          padding={4}
          borderRadius="none"
          borderBottom="4px solid"
          borderColor="#E64A19"
          mt="10px"
        >
          <Text
            fontWeight="semibold"
            fontSize="xl"
            color="#E64A19"
            textAlign="center"
          >
            {formattedCategory}
          </Text>
        </Card>
        <InfiniteScroll
          dataLength={fetchProductData}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<Spinner />}
        >
          <SimpleGrid columns={{ base: 6 }} spacing={2} mt="10px">
            {data?.pages.map((page) =>
              page.models.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))
            )}
          </SimpleGrid>
        </InfiniteScroll>
      </Box>
    </Center>
  );
};

export default ProductCategoryPage;
