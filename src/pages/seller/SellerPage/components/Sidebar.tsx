import { Avatar, Box, Card, Divider, Flex, Text } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import storePic from "../../../../assets/storePic.jpg";
import { useShopStore } from "../../../../store/shop-store";
import SidebarAccount from "./SidebarAccount";
import SidebarCustomerService from "./SidebarCustomerService";
import SidebarOrders from "./SidebarOrders";
import SidebarProduct from "./SidebarProduct";
const Sidebar = () => {
  const { storeName, picture } = useShopStore();

  return (
    <Card borderRadius="none" minHeight="100%" boxShadow="none">
      <Link to="/seller">
        <Flex mt="20px" alignItems="center" ml="10px">
          <Avatar src={picture || storePic} size="md" />
          <Text
            fontSize="x-large"
            textTransform="capitalize"
            fontWeight="semibold"
            ml="10px"
            mr="10px"
            whiteSpace="nowrap"
          >
            {storeName}
          </Text>
        </Flex>
      </Link>
      <Divider mt="15px" color="#DCDCDC" />
      <Box ml="10px">
        <SidebarOrders />
        <SidebarProduct />
        <SidebarCustomerService />
        <SidebarAccount />
        <Link to="/">
          <Flex
            alignItems="center"
            cursor="pointer"
            userSelect="none"
            mt="15px"
            color="#1877F2"
            _hover={{ color: "#165BB7" }}
          >
            <FiShoppingCart size="20px" />
            <Text ml="10px" mr="10px" fontWeight="semibold">
              Buyer Center
            </Text>
          </Flex>
        </Link>
      </Box>
    </Card>
  );
};

export default Sidebar;
