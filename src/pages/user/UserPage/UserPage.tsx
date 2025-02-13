import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { BiPurchaseTag } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { RiStore2Line } from "react-icons/ri";
import { Link, Outlet, useLocation } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import SidebarNavLink from "../../../components/sidebar/SidebarNavLink";
import SidebarTextLink from "../../../components/sidebar/SidebarTextLink";
import { useUserStore } from "../../../store/user-store";
const UserPage = () => {
  const location = useLocation();
  const profileLocation = location.pathname.startsWith("/user/account");
  const { picture, name } = useUserStore();
  const link = ["/user/account/profile", "/user/account/address"].includes(
    location.pathname
  )
    ? location.pathname
    : "/user/account/profile";

  return (
    <Grid
      templateColumns="0.3fr 0.2fr 0.8fr 0.3fr"
      templateAreas={`"asideLeft section1 section2 asideRight"`}
    >
      <GridItem area="section1" mt="20px">
        <Box>
          <Link to="/user/account/profile">
            <Flex>
              <Avatar src={picture || pic} size="md" />
              <Box ml="10px">
                <Text textTransform="capitalize" fontWeight="semibold">
                  {name}
                </Text>
                <Flex color="gray.500">
                  <FaRegEdit size="20" />
                  <Text ml="5px">Edit Profile</Text>
                </Flex>
              </Box>
            </Flex>
          </Link>

          <Divider mt="16px" mb="15px" borderColor="#BEBEBE" />
          <SidebarNavLink
            icon={FaRegUser}
            navLink={link}
            iconSize="20px"
            marginTop="10px"
            marginLeft="15px"
            title="My Account"
            titleMarginLeft="20px"
          />
          {profileLocation && (
            <Box ml="55px" mt="5px">
              <SidebarTextLink
                navLink="/user/account/profile"
                title="Profile"
              />
              <SidebarTextLink
                navLink="/user/account/address"
                title="Address Book"
              />
            </Box>
          )}
          <SidebarNavLink
            icon={FiHeart}
            navLink="/user/favorites"
            iconSize="20px"
            marginTop="10px"
            marginLeft="15px"
            title="My Favorites"
            titleMarginLeft="20px"
          />
          <SidebarNavLink
            icon={RiStore2Line}
            navLink="/user/following"
            iconSize="20px"
            marginTop="10px"
            marginLeft="15px"
            title="My Following"
            titleMarginLeft="20px"
          />
          <SidebarNavLink
            icon={BiPurchaseTag}
            navLink="/user/purchase"
            iconSize="20px"
            marginTop="10px"
            marginLeft="15px"
            title="My Purchase"
            titleMarginLeft="20px"
          />
        </Box>
      </GridItem>
      <GridItem area="section2" ml="10px" mt="20px">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default UserPage;
