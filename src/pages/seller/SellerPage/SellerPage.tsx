import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useShopStore } from "../../../store/shop-store";
import Sidebar from "./components/Sidebar";
import useGetUserStore from "./hooks/useGetUserStore";

const SellerPage = () => {
  const { data: getUserStoreInfo } = useGetUserStore();
  const {
    setStoreId,
    setStoreName,
    setStoreContactNumber,
    setPicture,
    setStatus,
    setAverageRating,
    setReviewCount,
  } = useShopStore();

  useEffect(() => {
    if (getUserStoreInfo) {
      setStoreId(getUserStoreInfo.storeId);
      setStoreName(getUserStoreInfo.storeName);
      setStoreContactNumber(getUserStoreInfo.contactNumber);
      setPicture(getUserStoreInfo.picture || null);
      setStatus(getUserStoreInfo.status);
      setAverageRating(getUserStoreInfo.averageRating);
      setReviewCount(getUserStoreInfo.reviewsCount);
    }
  }, [getUserStoreInfo]);

  return (
    <Box minWidth="1440px">
      <Grid
        // templateRows={"0.2fr 0.8fr"}
        templateColumns="300px 50px 1fr 50px"
        templateAreas={`
      
          "sidebar marginLeft main marginRight"
          `}
      >
        {/* <GridItem area="top" mt="20px" bg="blue">
          <Card
            width="100%"
            borderRadius="none"
            boxShadow="none"
            height="100%"
          ></Card>
        </GridItem> */}
        <GridItem area="sidebar" position="fixed" width="300px" height="100%">
          <Sidebar />
        </GridItem>
        <GridItem area="main" mt="20px">
          <Outlet />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default SellerPage;
