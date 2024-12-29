import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import ProductCard from "../../../components/product/ProductCard";
import { useUserStore } from "../../../store/user-store";
import useGetAllProducts from "../../../hooks/useGetAllProducts";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetAllProducts({
    pageSize: 5,
  });
  const fetchProductData =
    data?.pages.reduce((total, page) => total + page.models.length, 0) || 0;

  return (
    <Grid
      templateColumns="0.2fr 0.8fr 0.2fr"
      templateAreas={"'asideLeft main asideRight'"}
    >
      <GridItem area="main">
        <InfiniteScroll
          dataLength={fetchProductData}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<Spinner />}
        >
          {data?.pages.map((page) =>
            page.models.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))
          )}
        </InfiniteScroll>
      </GridItem>
    </Grid>
  );
};

export default HomePage;
