import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../../components/product/ProductCard";
import SearchHeader from "./components/SearchHeader";
import useSearchProduct from "./hooks/useSearchProduct";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [sortBy, setSortBy] = useState("productName");
  const { data, fetchNextPage, hasNextPage, isLoading } = useSearchProduct({
    pageSize: 30,
    search: keyword!,
    sortBy: sortBy,
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
        <Flex>
          <Box width="250px" bg="gray.300" mr="10px">
            asdasd
          </Box>
          <Stack>
            <Flex alignItems="center" mb="10px" mt="10px">
              <BsSearch />
              <Text ml="10px">
                Search Results for '
                <Text as="span" color="#E64A19">
                  {keyword}
                </Text>
                '
              </Text>
            </Flex>
            <SearchHeader sortBy={sortBy} setSortBy={setSortBy} />
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
