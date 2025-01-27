import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../../components/product/ProductCard";
import NoSearchResult from "./components/NoSearchResult";

import Filters from "../../../components/SortingAndFilter/Filters";
import SortingHeader from "../../../components/SortingAndFilter/SortingHeader";
import { useProductFilters } from "../../../hooks/useProductFilters";
import useSearchProduct from "./hooks/useSearchProduct";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const urlParam = `/search?keyword=${encodeURIComponent(keyword)}`;
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

  const { data, fetchNextPage, hasNextPage, isLoading } = useSearchProduct({
    pageSize: 15,
    search: keyword!,
    sortBy: sortBy,
    sortDirection: sortDirection,
    ratingFilter: ratingFilter,
    minPrice: minPrice,
    maxPrice: maxPrice,
  });

  const fetchProductData =
    data?.pages.reduce((total, page) => total + page.models.length, 0) || 0;

  const searchLength = data?.pages.flatMap((list) => list.models).length || 0;

  const handleResetFilterClick = () => {
    resetFilters();
    window.history.pushState(null, "", urlParam);
  };

  useEffect(() => {
    resetFilters();
  }, [keyword]);

  useEffect(() => {
    setFilters();
  }, []);

  if (isLoading) {
    return (
      <Center height="70vh">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <Center mt="20px">
      <Box minWidth="1230px" maxWidth="1230px">
        <Flex>
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
          />
          {searchLength < 1 && !isLoading ? (
            <Box width="100%">
              <NoSearchResult />
            </Box>
          ) : (
            <Stack width="100%">
              <Flex alignItems="center" mb="10px">
                <BsSearch />
                <Text ml="10px">
                  Search results for '
                  <Text as="span" color="#E64A19">
                    {keyword}
                  </Text>
                  '
                </Text>
              </Flex>
              <SortingHeader
                sortBy={sortBy}
                setSortBy={setSortBy}
                setSortDirection={setSortDirection}
                ratingFilter={ratingFilter}
                minPrice={minPrice}
                maxPrice={maxPrice}
                urlParam={urlParam || ""}
              />
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
            </Stack>
          )}
        </Flex>
      </Box>
    </Center>
  );
};

export default SearchPage;
