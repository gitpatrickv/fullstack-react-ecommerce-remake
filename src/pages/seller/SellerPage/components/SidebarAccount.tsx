import { Box, Text } from "@chakra-ui/react";
import { FaRegUserCircle } from "react-icons/fa";
import SidebarNavLink from "../../../../components/sidebar/SidebarNavLink";
import SidebarTextLink from "../../../../components/sidebar/SidebarTextLink";
import useHandleLogout from "../../../../hooks/useHandleLogout";
const SidebarAccount = () => {
  const handleLogout = useHandleLogout();

  return (
    <>
      <SidebarNavLink
        icon={FaRegUserCircle}
        navLink="/seller/account/info"
        iconSize="20px"
        marginTop="15px"
        title="My Account"
        titleMarginLeft="10px"
      />
      <Box ml="30px">
        <SidebarTextLink navLink="/seller/account/info" title=" Account Info" />
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
