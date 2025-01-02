import { Avatar, Box, Card, Divider, Flex, Text } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useShopStore } from "../../../../store/shop-store";
import SidebarAccount from "./SidebarAccount";
import SidebarProduct from "./SidebarProduct";
import ColorModeSwitch from "../../../../components/ColorModeSwitch";
const Sidebar = () => {
  const { storeName, picture } = useShopStore();
  //TODO: remove dark mode
  return (
    <Card borderRadius="none" minHeight="100vh" height="100%" boxShadow="none">
      <Link to="/seller">
        <Flex mt="20px" alignItems="center" ml="10px">
          <Avatar
            src={
              picture ||
              "https://media.istockphoto.com/id/912819604/vector/storefront-flat-design-e-commerce-icon.jpg?s=612x612&w=0&k=20&c=_x_QQJKHw_B9Z2HcbA2d1FH1U1JVaErOAp2ywgmmoTI="
            }
            size="md"
          />
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

          <ColorModeSwitch />
        </Flex>
      </Link>
      <Divider mt="15px" color="gray.500" />
      <Box ml="10px">
        <SidebarProduct />
        <SidebarAccount />
        <Link to="/">
          <Flex
            alignItems="center"
            cursor="pointer"
            userSelect="none"
            mt="15px"
            _hover={{ color: "#FF5722" }}
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
