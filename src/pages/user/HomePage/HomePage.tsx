import { Grid, GridItem, SimpleGrid, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../../../components/product/ProductCard";
import useGetAllProducts from "../../../hooks/useGetAllProducts";

const HomePage = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllProducts({
    pageSize: 20,
  });
  const fetchProductData =
    data?.pages.reduce((total, page) => total + page.models.length, 0) || 0;

  return (
    <Grid
      templateColumns="0.2fr 0.8fr 0.2fr"
      templateAreas={"'asideLeft main asideRight'"}
      mt="10px"
    >
      <GridItem area="main">
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
