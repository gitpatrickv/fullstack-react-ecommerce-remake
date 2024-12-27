import { Flex, Spacer, Text } from "@chakra-ui/react";
import { useUserStore } from "../../../store/user-store";
import { useAuthQueryStore } from "../../../store/auth-store";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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

  return (
    <Flex height="100px" bg="orange.500" alignItems="center" padding={10}>
      <Text>SELLER PAGE NAVBAR</Text>
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
