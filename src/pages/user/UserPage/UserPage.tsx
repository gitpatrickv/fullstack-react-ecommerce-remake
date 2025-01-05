import {
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { RiStore2Line } from "react-icons/ri";
import { Link, Outlet, useLocation } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
const UserPage = () => {
  const location = useLocation();
  const profileLocation = location.pathname.startsWith("/user/account");
  return (
    <Grid
      templateColumns="0.3fr 0.2fr 0.8fr 0.3fr"
      templateAreas={`"asideLeft section1 section2 asideRight"`}
    >
      <GridItem area="section1" mt="20px">
        <Box>
          <Link to="/user/account/profile">
            <Flex>
              <Avatar src={pic} size="md" />
              <Box ml="10px">
                <Text textTransform="capitalize">PATRICK</Text>
                <Flex>
                  <FaRegEdit size="20" />
                  <Text ml="5px">Edit Profile</Text>
                </Flex>
              </Box>
            </Flex>
          </Link>

          <Divider mt="16px" mb="15px" borderColor="#BEBEBE" />

          <Flex alignItems="center" ml="15px" cursor="pointer">
            <FaRegUser
              size="20px"
              color={profileLocation ? "#FF5722" : undefined}
            />
            <Link to="/user/account/profile">
              <Text
                ml="20px"
                _hover={{ color: "#E64A19" }}
                fontWeight="semibold"
                color={profileLocation ? "#FF5722" : "white.500"}
              >
                My Account
              </Text>
            </Link>
          </Flex>
          {profileLocation && (
            <Box ml="55px" mt="10px">
              <Link to="/user/account/profile">
                <Text
                  cursor="pointer"
                  mb="5px"
                  color={
                    location.pathname === "/user/account/profile"
                      ? "#FF5722"
                      : "white.500"
                  }
                >
                  Profile
                </Text>
              </Link>
              <Link to="/user/account/address">
                <Text
                  cursor="pointer"
                  mb="5px"
                  color={
                    location.pathname === "/user/account/address"
                      ? "#FF5722"
                      : "white.500"
                  }
                >
                  Address Book
                </Text>
              </Link>
            </Box>
          )}
          <Flex alignItems="center" ml="15px" cursor="pointer" mt="10px">
            <FiHeart
              size="20px"
              color={
                location.pathname === "/user/favorites" ? "#E64A19" : undefined
              }
            />
            <Link to="/user/favorites">
              <Text
                ml="20px"
                _hover={{ color: "#E64A19" }}
                fontWeight="semibold"
                color={
                  location.pathname === "/user/favorites"
                    ? "#FF5722"
                    : "white.500"
                }
              >
                My Favorites
              </Text>
            </Link>
          </Flex>
          <Flex alignItems="center" ml="15px" cursor="pointer" mt="10px">
            <RiStore2Line
              size="20px"
              color={
                location.pathname === "/user/following" ? "#E64A19" : undefined
              }
            />
            <Link to="/user/following">
              <Text
                ml="20px"
                _hover={{ color: "#E64A19" }}
                fontWeight="semibold"
                color={
                  location.pathname === "/user/following"
                    ? "#FF5722"
                    : "white.500"
                }
              >
                My Following
              </Text>
            </Link>
          </Flex>
        </Box>
      </GridItem>
      <GridItem area="section2" ml="10px" mt="20px">
        {location.pathname === "/user/favorites" ||
        location.pathname.startsWith("/user/purchase") ||
        location.pathname === "/user/following" ? (
          <Box>
            <Outlet />
          </Box>
        ) : (
          <Card borderRadius="none">
            <Outlet />
          </Card>
        )}
      </GridItem>
    </Grid>
  );
};

export default UserPage;
