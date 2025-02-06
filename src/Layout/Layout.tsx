import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import CreateAddressModal from "../pages/user/AddressPage/components/CreateAddressModal";
import { useUserStore } from "../store/user-store";
import Navbar from "./user/components/Navbar";
import useGetCurrentUserInfo from "./user/hooks/useGetCurrentUserInfo";

const Layout = () => {
  const { data: getUserInfo } = useGetCurrentUserInfo();
  const { setCartId, setName, setPicture, setGender, setEmail } =
    useUserStore();
  useEffect(() => {
    if (getUserInfo) {
      setCartId(getUserInfo.cartId);
      setName(getUserInfo.name);
      setPicture(getUserInfo.picture || null);
      setGender(getUserInfo.gender);
      setEmail(getUserInfo.email);
    }
  }, [getUserInfo]);

  return (
    <Box minWidth="1440px">
      <Navbar />

      <Box width="full">
        <Outlet />
        <ScrollRestoration />
        <CreateAddressModal />
      </Box>
    </Box>
  );
};

export default Layout;
