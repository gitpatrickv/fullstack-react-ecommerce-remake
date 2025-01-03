import {
  Card,
  Center,
  Grid,
  GridItem,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";

import ProductCard from "../../../components/product/ProductCard";
import useGetAllProducts from "../../../hooks/useGetAllProducts";
import Banner from "./components/Banner";
import Category from "./components/Category";
const HomePage = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllProducts({
    pageSize: 12,
  });
  const fetchProductData =
    data?.pages.reduce((total, page) => total + page.models.length, 0) || 0;

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <Grid
      templateColumns="0.2fr 0.8fr 0.2fr"
      templateAreas={"'asideLeft main asideRight'"}
      mt="10px"
    >
      <GridItem area="main">
        <Banner />
        <Category />
        <Card
          padding={4}
          borderRadius="none"
          borderBottom="4px solid"
          borderColor="#E64A19"
          mb="10px"
        >
          <Text
            fontWeight="semibold"
            fontSize="xl"
            color="#E64A19"
            textAlign="center"
          >
            DAILY DISCOVER
          </Text>
        </Card>
        <InfiniteScroll
          dataLength={fetchProductData}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<Spinner />}
        >
          <SimpleGrid columns={{ base: 6 }} spacing={2}>
            {data?.pages.map((page) =>
              page.models.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))
            )}
          </SimpleGrid>
        </InfiniteScroll>
      </GridItem>
    </Grid>
  );
};

export default HomePage;
