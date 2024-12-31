import { Card, Flex, Grid, GridItem } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";
import NavTop from "./NavTop";
import Search from "./Search";

const Navbar = () => {
  return (
    <Card width="100%" bg="#E64A19" borderRadius="none">
      <Grid
        templateColumns="0.4fr 0.2fr 1fr 0.2fr 0.4fr"
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
          <Flex justifyContent="center" cursor="pointer" color="white">
            <FiShoppingCart size="25px" />
          </Flex>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default Navbar;
