import { Box } from "@chakra-ui/react";

import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

const Layout = () => {
  return (
    <Box minWidth="1440px">
      <Navbar />
      <Box width="full">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
