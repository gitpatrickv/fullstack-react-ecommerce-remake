import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const SellerPage = () => {
  return (
    <Box minWidth="1440px">
      <Grid templateColumns="0.2fr 1fr" templateAreas={"'sidebar main'"}>
        <GridItem area="sidebar">
          <Sidebar />
        </GridItem>
        <GridItem area="main">
          <Outlet />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default SellerPage;
