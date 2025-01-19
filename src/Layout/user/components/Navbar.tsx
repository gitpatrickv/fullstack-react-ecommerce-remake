import {
  Card,
  Flex,
  Grid,
  GridItem,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import useGetCartItemsGroupedByStore from "../../../pages/user/CartPage/hooks/useGetCartItemsGroupedByStore";
import { useAuthQueryStore } from "../../../store/auth-store";
import NavTop from "./NavTop";
import Search from "./Search";

const Navbar = () => {
  const { colorMode } = useColorMode();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate("/cart");
  };

  const { data: getCartItems } = useGetCartItemsGroupedByStore();

  const cartItemsSize =
    getCartItems?.flatMap((cart) => cart.cartItems).length || 0;

  return (
    <Card
      width="100%"
      bg={colorMode === "dark" ? "gray.700" : "#E64A19"} //TODO: remove dark mode
      borderRadius="none"
    >
      <Grid
        templateColumns="0.4fr 175px 1fr 175px 0.4fr"
        templateRows=" 0.2fr 0.8fr"
        templateAreas={`
    "topLeft top top top topRight"
    "asideLeft home search cart asideRight"
`}
        alignItems="center"
      >
        <GridItem area="top">
          <NavTop />
        </GridItem>
        <GridItem area="search" mb="20px" mt="20px">
          <Search />
        </GridItem>
        <GridItem area="home">
          <Link to="/">
            <Flex justifyContent="center" cursor="pointer" color="white">
              <GoHome size="25px" />
            </Flex>
          </Link>
        </GridItem>
        <GridItem area="cart" mb="20px" mt="20px">
          {jwtToken && (
            <Flex
              justifyContent="center"
              cursor="pointer"
              color="white"
              position="relative"
              onClick={handleNavigateClick}
            >
              <FiShoppingCart size="25px" />
              <Flex
                height="20px"
                width="20px"
                bg="white"
                borderRadius="full"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                top="-8px"
                right="63px"
              >
                <Text color="#E64A19" fontSize="sm" fontWeight="semibold">
                  {cartItemsSize}
                </Text>
              </Flex>
            </Flex>
          )}
        </GridItem>
      </Grid>
    </Card>
  );
};

export default Navbar;
