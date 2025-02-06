import { Box } from "@chakra-ui/react";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import SidebarNavLink from "../../../../components/sidebar/SidebarNavLink";
import SidebarTextLink from "../../../../components/sidebar/SidebarTextLink";

const SidebarCustomerService = () => {
  return (
    <>
      <SidebarNavLink
        icon={LiaHandsHelpingSolid}
        navLink="/seller/customer/service/review"
        iconSize="20px"
        marginTop="15px"
        title="Customer Service"
        titleMarginLeft="10px"
      />
      <Box ml="30px">
        <SidebarTextLink
          navLink="/seller/customer/service/review"
          title="Review Management"
        />
      </Box>
    </>
  );
};

export default SidebarCustomerService;
