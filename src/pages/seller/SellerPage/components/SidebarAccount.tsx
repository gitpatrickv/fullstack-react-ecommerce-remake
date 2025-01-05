import { Box, Flex, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthQueryStore } from "../../../../store/auth-store";
import { useShopStore } from "../../../../store/shop-store";
import { useUserStore } from "../../../../store/user-store";
const SidebarAccount = () => {
  const [isAccount, setIsAccount] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { resetUser } = useUserStore();
  const { resetStore } = useShopStore();
  const { logout } = useAuthQueryStore();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(navigate);
    queryClient.setQueryData(["user"], null);
    queryClient.setQueryData(["store"], null);
    resetUser();
    resetStore();
  };

  const currentLocation = location.pathname.startsWith("/seller/account");

  return (
    <Box mt="15px">
      <Flex
        alignItems="center"
        onClick={() => setIsAccount(!isAccount)}
        cursor="pointer"
        userSelect="none"
      >
        <FaRegUserCircle
          size="20px"
          color={currentLocation ? "#FF5722" : undefined}
        />
        <Link to="/seller/account/info">
          <Text
            ml="10px"
            mr="10px"
            fontWeight="semibold"
            _hover={{ color: "#FF5722" }}
            color={currentLocation ? "#FF5722" : "white.500"}
          >
            My Account
          </Text>
        </Link>

        {isAccount ? (
          <IoIosArrowDown color={currentLocation ? "#FF5722" : undefined} />
        ) : (
          <IoIosArrowUp color={currentLocation ? "#FF5722" : undefined} />
        )}
      </Flex>
      {isAccount && (
        <>
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
      )}
    </Box>
  );
};

export default SidebarAccount;
