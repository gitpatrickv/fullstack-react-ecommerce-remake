import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import ProductCard from "../../../components/product/ProductCard";
import Filters from "../../../components/SortingAndFilter/Filters";
import SortingHeader from "../../../components/SortingAndFilter/SortingHeader";
import { Store } from "../../../entities/Store";
import useGetOneResource from "../../../hooks/useGetOneResource";
import { useProductFilters } from "../../../hooks/useProductFilters";
import StoreInfoSection from "../ProductDetailPage/components/StoreInfoSection";
import useGetStoreCategories from "./hooks/useGetStoreCategories";
import useGetStoreProductsByStoreId from "./hooks/useGetStoreProductsByStoreId";

const StorePage = () => {
  const { storeId, storeName } = useParams<{
    storeId: string;
    storeName: string;
  }>();

  const urlParam = `/store/${storeId}/${storeName}?`;
  const { data: getStoreDetail } = useGetOneResource<Store>({
    module: "store",
    id: storeId!,
  });

  const {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    ratingFilter,
    setRatingFilter,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    resetFilters,
    setFilters,
    category,
    setCategory,
  } = useProductFilters();

  const { data, fetchNextPage, hasNextPage, isLoading } =
    useGetStoreProductsByStoreId({
      pageSize: 18,
      storeId: storeId!,
      category: category,
      sortBy: sortBy,
      sortDirection: sortDirection,
      ratingFilter: ratingFilter,
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
  const { data: getStoreCategories } = useGetStoreCategories(storeId!);

  const handleResetFilterClick = () => {
    resetFilters();
    window.history.pushState(null, "", urlParam);
  };

  useEffect(() => {
    resetFilters();
  }, [storeId]);

  useEffect(() => {
    setFilters();
  }, []);

  const fetchProductData =
    data?.pages.reduce((total, page) => total + page.models.length, 0) || 0;

  return (
    <Center>
      <Box minWidth="1230px" maxWidth="1230px">
        <StoreInfoSection store={getStoreDetail} />
        <Flex mt="20px">
          <Filters
            ratingFilter={ratingFilter}
            sortBy={sortBy}
            sortDirection={sortDirection}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            setRatingFilter={setRatingFilter}
            handleResetFilterClick={handleResetFilterClick}
            urlParam={urlParam || ""}
            isCategory={true}
            getStoreCategories={getStoreCategories}
            category={category}
            setCategory={setCategory}
          />
          <Stack width="100%">
            <SortingHeader
              sortBy={sortBy}
              setSortBy={setSortBy}
              setSortDirection={setSortDirection}
              ratingFilter={ratingFilter}
              minPrice={minPrice}
              maxPrice={maxPrice}
              urlParam={urlParam || ""}
              category={category}
            />
            {isLoading ? (
              <Center mt="50px">
                <Spinner />
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
          </Stack>
        </Flex>
      </Box>
    </Center>
  );
};

export default StorePage;
