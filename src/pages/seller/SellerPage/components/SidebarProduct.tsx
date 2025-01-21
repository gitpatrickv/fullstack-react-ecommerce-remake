import { Box, Text } from "@chakra-ui/react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import SidebarNavLink from "../../../../components/sidebar/SidebarNavLink";
const SidebarProduct = () => {
  const location = useLocation();

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
        <Link to={`/seller/product`}>
          <Text
            mb="3px"
            mt="3px"
            color={
              location.pathname === "/seller/product" ? "#FF5722" : "white.500"
            }
            cursor="pointer"
            _hover={{ color: "#FF5722" }}
          >
            My Products
          </Text>
        </Link>
        <Link to={`/seller/product/create`}>
          <Text
            color={
              location.pathname === "/seller/product/create"
                ? "#FF5722"
                : "white.500"
            }
            cursor="pointer"
            _hover={{ color: "#FF5722" }}
          >
            Add New Product
          </Text>
        </Link>
      </Box>
    </>
  );
};

export default SidebarProduct;
