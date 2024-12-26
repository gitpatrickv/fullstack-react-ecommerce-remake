import {
  Box,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import { useAuthQueryStore } from "../../../store/auth-store";
import Login from "./Login";
import Register from "./Register";

const NavTop = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useAuthQueryStore();

  const handleLoginClick = (value: boolean) => {
    setIsLogin(value);
    onOpen();
  };

  const textStyles = {
    cursor: "pointer",
    userSelect: "none" as "none",
    _hover: {
      color: "orange.500",
    },
  };

  return (
    <>
      <Flex justifyContent="end">
        <Text mr="20px" {...textStyles}>
          START SELLING
        </Text>
        <Text mr="20px" onClick={() => handleLoginClick(true)} {...textStyles}>
          LOGIN
        </Text>
        <Text onClick={() => handleLoginClick(false)} {...textStyles}>
          SIGNUP
        </Text>
      </Flex>

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
