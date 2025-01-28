import {
  Box,
  Card,
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import ProductCard from "../../../components/product/ProductCard";

import Filters from "../../../components/SortingAndFilter/Filters";
import SortingHeader from "../../../components/SortingAndFilter/SortingHeader";
import { useProductFilters } from "../../../hooks/useProductFilters";
import useGetAllProductsByCategory from "./hooks/useGetAllProductsByCategory";

const ProductCategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const formattedCategory = category?.replace(/_/g, " ");
  const urlParam = `/category/${encodeURIComponent(category!)}?`;
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
  } = useProductFilters();

  const { data, fetchNextPage, hasNextPage, isLoading } =
    useGetAllProductsByCategory({
      pageSize: 18,
      category: category!,
      sortBy: sortBy,
      sortDirection: sortDirection,
      ratingFilter: ratingFilter,
      minPrice: minPrice,
      maxPrice: maxPrice,
    });

  const fetchProductData =
    data?.pages.reduce((total, page) => total + page.models.length, 0) || 0;

  const handleResetFilterClick = () => {
    resetFilters();
    window.history.pushState(null, "", urlParam);
  };

  useEffect(() => {
    resetFilters();
  }, [category]);

  useEffect(() => {
    setFilters();
  }, []);

  return (
    <Center mt="10px">
      <Box minWidth="1230px" maxWidth="1230px">
        <Card
          padding={4}
          borderRadius="none"
          borderBottom="4px solid"
          borderColor="#E64A19"
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
            isCategory={false}
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

export default ProductCategoryPage;
