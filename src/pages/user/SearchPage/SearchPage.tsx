import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../../components/product/ProductCard";
import RatingFilter from "./components/RatingFilter";
import SearchHeader from "./components/SearchHeader";
import useSearchProduct from "./hooks/useSearchProduct";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const ratingFilterFromUrl = searchParams.get("ratingFilter");
  const rating = ratingFilterFromUrl ? Number(ratingFilterFromUrl) : null;
  const sorting = searchParams.get("sortBy") || "productName";
  const [sortBy, setSortBy] = useState(sorting);
  const [ratingFilter, setRatingFilter] = useState<number | null>(rating);

  const { data, fetchNextPage, hasNextPage, isLoading } = useSearchProduct({
    pageSize: 15,
    search: keyword!,
    sortBy: sortBy,
    ratingFilter: ratingFilter,
  });

  const fetchProductData =
    data?.pages.reduce((total, page) => total + page.models.length, 0) || 0;

  const searchLength = data?.pages.flatMap((list) => list.models).length || 0;

  useEffect(() => {
    setRatingFilter(null);
    setSortBy("productName");
  }, [keyword]);

  useEffect(() => {
    if (rating) setRatingFilter(rating);
    if (sorting) setSortBy(sorting);
  }, []);

  if (isLoading) {
    return (
      <Center height="70vh">
        <Spinner size="lg" />
      </Center>
    );
  }

  if (searchLength < 1 && !isLoading) {
    return (
      <Center height="70vh" flexDirection="column">
        <Text fontSize="xx-large" fontWeight="semibold">
          Oops!
        </Text>
        <Text fontSize="xl" fontWeight="semibold">
          We found no results for your search
        </Text>
        <Text color="#E64A19" fontSize="xl" fontWeight="semibold">
          ' {keyword} '
        </Text>
      </Center>
    );
  }

  return (
    <Center mt="20px">
      <Box minWidth="1200px" maxWidth="1200px">
        <Flex>
          <Box width="250px" mr="10px">
            <Flex alignItems="center">
              <CiFilter size="25px" />
              <Text fontSize="lg" fontWeight="semibold" ml="10px">
                SEARCH FILTER
              </Text>
            </Flex>
            <RatingFilter
              ratingFilter={ratingFilter}
              setRatingFilter={setRatingFilter}
              sortBy={sortBy}
            />
          </Box>
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
            <SearchHeader
              sortBy={sortBy}
              setSortBy={setSortBy}
              ratingFilter={ratingFilter}
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
        </Flex>
      </Box>
    </Center>
  );
};

export default SearchPage;
