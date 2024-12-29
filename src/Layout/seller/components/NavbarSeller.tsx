import { Flex, Spacer, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useGetOne from "../../../hooks/useGetOne";
import { useAuthQueryStore } from "../../../store/auth-store";
import { useUserStore } from "../../../store/user-store";

const NavbarSeller = () => {
  const navigate = useNavigate();
  const { name, resetUser } = useUserStore();
  const { logout } = useAuthQueryStore();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(navigate);
    queryClient.setQueryData(["user"], null);
    resetUser();
  };

  const handleNavigateClick = () => {
    navigate("/");
  };

  const params = useParams<{ storeName: string }>();
  const storeName = params.storeName;
  const { data: getStoreInfo } = useGetOne({ module: "store", id: storeName! });

  return (
    <Flex height="100px" bg="orange.500" alignItems="center" padding={10}>
      <Text fontSize="x-large" textTransform="capitalize" fontWeight="semibold">
        {getStoreInfo?.storeName} {getStoreInfo?.status}
      </Text>
      <Spacer />
      <Text mr="20px" onClick={handleNavigateClick}>
        Buyer Centre
      </Text>
      <Text mr="20px">{name}</Text>
      <Text onClick={handleLogout}>LOGOUT</Text>
    </Flex>
  );
};

export default NavbarSeller;
