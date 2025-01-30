import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useAuthQueryStore } from "../../store/auth-store";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { onOpen } = useAuthQueryStore();
  const handleLoginClick = () => {
    navigate("/");
    onOpen();
  };

  return (
    <>
      <Center mt="100px">
        <Box display="flex" flexDirection="column">
          <Heading>Oops...</Heading>
          <Text>
            You are not authorized to access this resource. Please provide valid
            authentication credentials.
          </Text>
          <Center>
            <Button
              textAlign="center"
              mt="20px"
              onClick={handleLoginClick}
              width="120px"
              bg="#FF5722"
              _hover={{ bg: "#E64A19" }}
            >
              Login
            </Button>
          </Center>
        </Box>
      </Center>
    </>
  );
};

export default Unauthorized;
