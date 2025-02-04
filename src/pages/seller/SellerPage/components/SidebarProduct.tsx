import { Box } from "@chakra-ui/react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import SidebarNavLink from "../../../../components/sidebar/SidebarNavLink";
import SidebarTextLink from "../../../../components/sidebar/SidebarTextLink";
const SidebarProduct = () => {
  return (
    <>
      <SidebarNavLink
        icon={HiOutlineShoppingBag}
        navLink="/seller/product"
        iconSize="20px"
        marginTop="15px"
        title="My Product"
        titleMarginLeft="10px"
      />
      <Box ml="30px">
        <SidebarTextLink navLink="/seller/product" title="My Products" />
        <SidebarTextLink
          navLink="/seller/product/create"
          title="Add New Product"
        />
      </Box>
    </>
  );
};

export default SidebarProduct;
