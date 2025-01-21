import { Box, Text } from "@chakra-ui/react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import SidebarNavLink from "../../../../components/sidebar/SidebarNavLink";
import useHandleLogout from "../../../../hooks/useHandleLogout";
const SidebarAccount = () => {
  const location = useLocation();
  const handleLogout = useHandleLogout();

  return (
    <>
      <SidebarNavLink
        icon={FaRegUserCircle}
        navLink="/seller/account/info"
        iconSize="20px"
        marginTop="15px"
        title="My Product"
        titleMarginLeft="10px"
      />
      <Box ml="30px">
        <Link to="/seller/account/info">
          <Text
            mb="3px"
            mt="3px"
            cursor="pointer"
            color={
              location.pathname === "/seller/account/info"
                ? "#FF5722"
                : "white.500"
            }
            _hover={{ color: "#FF5722" }}
          >
            Account Info
          </Text>
        </Link>
        <Text
          mb="3px"
          cursor="pointer"
          onClick={handleLogout}
          _hover={{ color: "#FF5722" }}
        >
          Logout
        </Text>
      </Box>
    </>
  );
};

export default SidebarAccount;
