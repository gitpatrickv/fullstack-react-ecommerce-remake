import { Button, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import GetAllProductResponse from "../../../entities/Product";
import useGetAllResources from "../../../hooks/useGetAllResources";
import Header from "./components/Header";
import ProductListHeader from "./components/ProductListHeader";
import ProductsList from "./components/ProductsList";

const MyProductsPage = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("createdDate");
  const [sortDirection, setSortDirection] = useState("DESC");
  const {
    data: getAllStoreProduct,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useGetAllResources<GetAllProductResponse>({
    module: "product",
    pageSize: 12,
    sortBy: sortBy,
    sortDirection: sortDirection,
  });
  const fetchProductData =
    getAllStoreProduct?.pages.reduce(
      (total, page) => total + page.models.length,
      0
    ) || 0;

  const length =
    getAllStoreProduct?.pages.flatMap((page) => page.models).length || 0;

  const handleNavigateClick = () => {
    navigate("/seller/product/create");
  };

  if (length === 0 && !isLoading) {
    return (
      <Center height="90vh">
        <Flex flexDirection="column" alignItems="center">
          <Text fontSize="x-large">No products available yet.</Text>
          <Button
            onClick={handleNavigateClick}
            bg="#FF5722"
            _hover={{ bg: "#E64A19" }}
            mt="20px"
          >
            Add Product
          </Button>
        </Flex>
      </Center>
    );
  }

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <>
      <Header
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      <ProductListHeader />
      <InfiniteScroll
        dataLength={fetchProductData}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Spinner />}
      >
        {getAllStoreProduct?.pages.map((page) =>
          page.models.map((product) => (
            <ProductsList key={product.productId} product={product} />
          ))
        )}
      </InfiniteScroll>
    </>
  );
};

export default MyProductsPage;
