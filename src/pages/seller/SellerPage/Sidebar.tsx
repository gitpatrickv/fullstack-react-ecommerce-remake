import { Box, Card, Flex, Text } from "@chakra-ui/react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import SidebarAccount from "./SidebarAccount";
import SidebarProduct from "./SidebarProduct";

const Sidebar = () => {
  return (
    <Card borderRadius="none" minHeight="100vh" height="100%">
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
            <HiOutlineShoppingBag size="20px" />
            <Text ml="10px" mr="10px" fontWeight="semibold">
              Buyer Centre
            </Text>
          </Flex>
        </Link>
      </Box>
    </Card>
  );
};

export default Sidebar;
