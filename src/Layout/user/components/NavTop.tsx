import {
  Avatar,
  Box,
  Divider,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import { useAuthQueryStore } from "../../../store/auth-store";
import { useUserStore } from "../../../store/user-store";
import Login from "./Login";
import Register from "./Register";
const NavTop = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { resetUser, name, picture, storeId } = useUserStore();
  const { isOpen, onOpen, onClose, logout } = useAuthQueryStore();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const role = authStore.role;

  const handleLoginClick = (value: boolean) => {
    setIsLogin(value);
    onOpen();
  };

  const handleLogout = () => {
    logout(navigate);
    queryClient.setQueryData(["user"], null);
    resetUser();
  };

  const textStyles = {
    cursor: "pointer",
    userSelect: "none" as "none",
    _hover: {
      color: "orange.500",
    },
    color: "white",
  };

  const handleNavigateSellerPageClick = () => {
    navigate(role === "SELLER" ? `/seller` : "/create/store");
  };

  return (
    <>
      {jwtToken ? (
        <Flex alignItems="center">
          <Text
            mr="10px"
            {...textStyles}
            onClick={handleNavigateSellerPageClick}
          >
            Seller Centre
          </Text>
          <Spacer />
          <Flex alignItems="center">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="menu"
                icon={<Avatar src={picture || pic} size="xs" />}
                variant="none"
              />
              <MenuButton as={Text} cursor="pointer" color="white">
                {name}
              </MenuButton>
              <MenuList>
                <MenuItem paddingBottom={3} paddingTop={3}>
                  <Text>My Account</Text>
                </MenuItem>

                <MenuItem
                  onClick={handleLogout}
                  paddingBottom={3}
                  paddingTop={3}
                >
                  <Text>Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      ) : (
        <Flex justifyContent="end">
          <Text
            mr="20px"
            onClick={() => handleLoginClick(true)}
            {...textStyles}
          >
            LOGIN
          </Text>
          <Text onClick={() => handleLoginClick(false)} {...textStyles}>
            SIGNUP
          </Text>
        </Flex>
      )}

      <Box>
        <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody mt="10px">
              <Box>
                <Flex justifyContent="space-evenly" alignItems="center">
                  <Text
                    fontSize="x-large"
                    fontWeight="semibold"
                    textTransform="capitalize"
                    cursor="pointer"
                    onClick={() => setIsLogin(true)}
                    color={isLogin ? "black" : "gray.500"}
                    userSelect="none"
                  >
                    Login
                  </Text>
                  <Divider
                    orientation="vertical"
                    height="30px"
                    borderColor="gray.300"
                    ml="10px"
                  />
                  <Text
                    fontSize="x-large"
                    fontWeight="semibold"
                    textTransform="capitalize"
                    cursor="pointer"
                    onClick={() => setIsLogin(false)}
                    color={isLogin ? "gray.500" : "black"}
                    userSelect="none"
                  >
                    Register
                  </Text>
                </Flex>
                <Divider mb="15px" mt="15px" />
                {isLogin ? <Login /> : <Register />}
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default NavTop;
