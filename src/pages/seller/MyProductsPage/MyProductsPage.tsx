import { Center, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetAll from "../../../hooks/useGetAll";
import Header from "./components/Header";
import ProductListHeader from "./components/ProductListHeader";
import ProductsList from "./components/ProductsList";

const MyProductsPage = () => {
  const [sortBy, setSortBy] = useState("");
  const {
    data: getAllStoreProduct,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useGetAll({
    module: "product",
    pageSize: 10,
    sortBy: sortBy,
  });
  const fetchProductData =
    getAllStoreProduct?.pages.reduce(
      (total, page) => total + page.models.length,
      0
    ) || 0;

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <>
      <Header sortBy={sortBy} setSortBy={setSortBy} />
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
