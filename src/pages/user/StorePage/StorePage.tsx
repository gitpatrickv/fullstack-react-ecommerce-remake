import { Box, Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import ProductCard from "../../../components/product/ProductCard";
import { Store } from "../../../entities/Store";
import useGetOneResource from "../../../hooks/useGetOneResource";
import StoreInfoSection from "../ProductDetailPage/components/StoreInfoSection";
import useGetStoreProductsByStoreId from "./hooks/useGetStoreProductsByStoreId";

const StorePage = () => {
  const params = useParams<{ storeId: string }>();
  const storeId = params.storeId;

  const { data: getStoreDetail } = useGetOneResource<Store>({
    module: "store",
    id: storeId!,
  });

  const { data, fetchNextPage, hasNextPage, isLoading } =
    useGetStoreProductsByStoreId({
      pageSize: 18,
      storeId: storeId!,
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
    <Center>
      <Box minWidth="1200px" maxWidth="1200px">
        <StoreInfoSection store={getStoreDetail} />
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

export default StorePage;
