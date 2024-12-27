import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { useUserStore } from "../store/user-store";
import Navbar from "./user/components/Navbar";
import useGetCurrentUserInfo from "./user/hooks/useGetCurrentUserInfo";
import NavbarSeller from "./seller/components/NavbarSeller";

const Layout = () => {
  const location = useLocation();
  const { data: getUserInfo } = useGetCurrentUserInfo();
  const { setUserId, setName, setPicture, setGender, setEmail, setSeller } =
    useUserStore();
  useEffect(() => {
    if (getUserInfo) {
      setUserId(getUserInfo?.userId);
      setName(getUserInfo.name);
      setPicture(getUserInfo.picture || null);
      setGender(getUserInfo.gender);
      setEmail(getUserInfo.email);
      setSeller(getUserInfo.seller);
    }
  }, [getUserInfo]);

  return (
    <Box minWidth="1440px">
      {location.pathname.startsWith("/seller") ? <NavbarSeller /> : <Navbar />}
      <Box width="full">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
