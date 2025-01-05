import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
const SidebarProduct = () => {
  const [isProductPage, setIsProductPage] = useState(true);
  const location = useLocation();

  const currentLocation = location.pathname.startsWith("/seller/product");

  return (
    <Box mt="15px">
      <Flex
        alignItems="center"
        onClick={() => setIsProductPage(!isProductPage)}
        cursor="pointer"
        userSelect="none"
      >
        <HiOutlineShoppingBag
          size="20px"
          color={currentLocation ? "#FF5722" : undefined}
        />
        <Link to="/seller/product">
          <Text
            ml="10px"
            mr="10px"
            fontWeight="semibold"
            _hover={{ color: "#FF5722" }}
            color={currentLocation ? "#FF5722" : "white.500"}
          >
            My Product
          </Text>
        </Link>

        {isProductPage ? (
          <IoIosArrowDown color={currentLocation ? "#FF5722" : undefined} />
        ) : (
          <IoIosArrowUp color={currentLocation ? "#FF5722" : undefined} />
        )}
      </Flex>
      {isProductPage && (
        <>
          <Box ml="30px">
            <Link to={`/seller/product`}>
              <Text
                mb="3px"
                mt="3px"
                color={
                  location.pathname === "/seller/product"
                    ? "#FF5722"
                    : "white.500"
                }
                cursor="pointer"
                _hover={{ color: "#FF5722" }}
              >
                My Products
              </Text>
            </Link>
            <Link to={`/seller/product/create`}>
              <Text
                color={
                  location.pathname === "/seller/product/create"
                    ? "#FF5722"
                    : "white.500"
                }
                cursor="pointer"
                _hover={{ color: "#FF5722" }}
              >
                Add New Product
              </Text>
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SidebarProduct;
