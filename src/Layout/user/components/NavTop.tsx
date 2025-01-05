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
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { RiStore2Line } from "react-icons/ri";
import { SlLogout } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import ColorModeSwitch from "../../../components/ColorModeSwitch";
import useHandleLogout from "../../../hooks/useHandleLogout";
import { useAuthQueryStore } from "../../../store/auth-store";
import { useUserStore } from "../../../store/user-store";
import Login from "./Login";
import Register from "./Register";
const NavTop = () => {
  const handleLogout = useHandleLogout();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { picture } = useUserStore();
  const { isOpen, onOpen, onClose } = useAuthQueryStore();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const role = authStore.role;

  const handleLoginClick = (value: boolean) => {
    setIsLogin(value);
    onOpen();
  };

  const textStyles = {
    cursor: "pointer",
    userSelect: "none" as "none",
    _hover: {
      textDecoration: "underline",
    },
    color: "white",
  };

  const handleNavigateSellerPageClick = () => {
    navigate(role === "SELLER" ? `/seller` : "/create/store");
  };
  //TODO: remove dark mode
  return (
    <>
      {jwtToken ? (
        <Flex alignItems="center">
          <Text
            mr="10px"
            {...textStyles}
            onClick={handleNavigateSellerPageClick}
          >
            Seller Center
          </Text>
          <Spacer />
          <ColorModeSwitch />
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="menu"
              icon={<Avatar src={picture || pic} size="xs" />}
              variant="none"
            />
            <MenuList>
              <Link to="/user/account/profile">
                <MenuItem paddingBottom={3} paddingTop={3}>
                  <FaRegUser size="20px" />
                  <Text ml="10px">My Account</Text>
                </MenuItem>
              </Link>
              <Link to="/user/favorites">
                <MenuItem paddingBottom={3} paddingTop={3}>
                  <FiHeart size="20px" />
                  <Text ml="10px">My Favorites</Text>
                </MenuItem>
              </Link>
              <Link to="/user/following">
                <MenuItem paddingBottom={3} paddingTop={3}>
                  <RiStore2Line size="20px" />
                  <Text ml="10px">My Following</Text>
                </MenuItem>
              </Link>
              <MenuItem onClick={handleLogout} paddingBottom={3} paddingTop={3}>
                <SlLogout size="20px" />
                <Text ml="10px">Logout</Text>
              </MenuItem>
            </MenuList>
          </Menu>
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
                    color={isLogin ? "white.500" : "gray.500"}
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
                    color={isLogin ? "white.500" : "black"}
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
