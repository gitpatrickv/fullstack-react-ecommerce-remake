import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { useUserStore } from "../store/user-store";
import Navbar from "./user/components/Navbar";
import useGetCurrentUserInfo from "./user/hooks/useGetCurrentUserInfo";
import CreateAddressModal from "../pages/user/AddressPage/components/CreateAddressModal";

const Layout = () => {
  const { data: getUserInfo } = useGetCurrentUserInfo();
  const { setUserId, setName, setPicture, setGender, setEmail } =
    useUserStore();
  useEffect(() => {
    if (getUserInfo) {
      setUserId(getUserInfo.userId);
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
        <CreateAddressModal />
      </Box>
    </Box>
  );
};

export default Layout;
