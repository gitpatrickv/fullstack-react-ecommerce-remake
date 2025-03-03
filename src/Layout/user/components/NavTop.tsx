import {
  Avatar,
  Box,
  Divider,
  Flex,
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
import { BiPurchaseTag } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { RiStore2Line } from "react-icons/ri";
import { SlLogout } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import useHandleLogout from "../../../hooks/useHandleLogout";
import { useAuthQueryStore } from "../../../store/auth-store";
import { useUserStore } from "../../../store/user-store";
import Login from "./Login";
import Register from "./Register";
const NavTop = () => {
  const handleLogout = useHandleLogout();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { picture, name } = useUserStore();
  const { isOpen, onOpen, onClose } = useAuthQueryStore();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const role = authStore.role;

  const handleLoginClick = (value: boolean) => {
    setIsLogin(value);
    onOpen();
  };

  const handleNavigateSellerPageClick = () => {
    navigate(role === "SELLER" ? `/seller` : "/create/store");
  };

  const textStyles = {
    cursor: "pointer",
    userSelect: "none" as "none",
    _hover: {
      textDecoration: "underline",
    },
    color: "white",
  };

  const menuList = [
    {
      key: "1",
      link: "/user/account/profile",
      icon: <FaRegUser size="20px" />,
      title: "My Account",
    },
    {
      key: "2",
      link: "/user/favorites",
      icon: <FiHeart size="20px" />,
      title: "My Favorites",
    },
    {
      key: "3",
      link: "/user/following",
      icon: <RiStore2Line size="20px" />,
      title: "My Following",
    },
    {
      key: "4",
      link: "/user/purchase",
      icon: <BiPurchaseTag size="20px" />,
      title: "My Purchase",
    },
  ];

  return (
    <>
      {jwtToken ? (
        <Flex alignItems="center">
          <Text
            mr="10px"
            {...textStyles}
            onClick={handleNavigateSellerPageClick}
          >
            {role === "USER" ? "Start Selling" : "Seller Center"}
          </Text>
          <Spacer />
          <Menu>
            <MenuButton aria-label="menu" mt="5px" mb="10px" userSelect="none">
              <Flex>
                <Avatar src={picture || pic} size="xs" />
                <Text color="white" ml="5px">
                  {name}
                </Text>
              </Flex>
            </MenuButton>
            <MenuList borderRadius="none" mt="10px" position="relative" py={0}>
              <Box
                borderLeft="8px solid transparent"
                borderRight="8px solid transparent"
                borderBottom="18px solid white"
                position="absolute"
                top="-18px"
                left="40px"
              />
              {menuList.map((list) => (
                <Link to={list.link} key={list.key}>
                  <MenuItem paddingBottom={3} paddingTop={3}>
                    {list.icon}
                    <Text ml="10px">{list.title}</Text>
                  </MenuItem>
                </Link>
              ))}
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
          <ModalContent borderRadius="none">
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
                    color={isLogin ? "gray.500" : "white.500"}
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
