import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate("/");
  };

  return (
    <>
      <Center mt="100px">
        <Box display="flex" flexDirection="column">
          <Heading>Oops...</Heading>
          <Text>
            {isRouteErrorResponse(error)
              ? "This page does not exist."
              : "An unexpected error occurred."}
          </Text>
          <Center>
            <Button
              textAlign="center"
              mt="20px"
              onClick={handleNavigateClick}
              width="120px"
              bg="orange.500"
              _hover={{ bg: "orange.600" }}
            >
              <Text mb="3px">Return</Text>
            </Button>
          </Center>
        </Box>
      </Center>
    </>
  );
};

export default ErrorPage;
