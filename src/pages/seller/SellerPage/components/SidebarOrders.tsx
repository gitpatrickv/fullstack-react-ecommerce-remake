import { Box } from "@chakra-ui/react";
import { FaRegFileLines } from "react-icons/fa6";
import SidebarNavLink from "../../../../components/sidebar/SidebarNavLink";
import SidebarTextLink from "../../../../components/sidebar/SidebarTextLink";
const SidebarOrders = () => {
  return (
    <>
      <SidebarNavLink
        icon={FaRegFileLines}
        navLink="/seller/order"
        iconSize="20px"
        marginTop="15px"
        title="Orders"
        titleMarginLeft="10px"
      />
      <Box ml="30px">
        <SidebarTextLink navLink="/seller/order/all" title="All" />
        <SidebarTextLink navLink="/seller/order/unpaid" title="To Pay" />
        <SidebarTextLink navLink="/seller/order/to-ship" title="To Ship" />
        <SidebarTextLink navLink="/seller/order/shipping" title="Shipping" />
        <SidebarTextLink navLink="/seller/order/completed" title="Completed" />
        <SidebarTextLink navLink="/seller/order/rated" title="Rated" />
        <SidebarTextLink navLink="/seller/order/cancelled" title="Cancelled" />
      </Box>
    </>
  );
};

export default SidebarOrders;
