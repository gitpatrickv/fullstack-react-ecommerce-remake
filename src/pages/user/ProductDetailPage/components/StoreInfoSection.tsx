import {
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { IoIosStar } from "react-icons/io";
import { PiChatCircleDots } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import storePic from "../../../../assets/storePic.jpg";
import OrangeButton from "../../../../components/Button/OrangeButton";
import ViewShopButton from "../../../../components/Button/ViewShopButton";
import { Store } from "../../../../entities/Store";
interface Props {
  store?: Store;
}

const StoreInfoSection = ({ store }: Props) => {
  const location = useLocation();
  const productLocation = location.pathname.startsWith("/product");
  const storeLocation = location.pathname.startsWith("/store");
  return (
    <Card borderRadius="none" padding={5} mt="10px">
      <Grid
        templateColumns="0.6fr 0.1fr 0.1fr 0.2fr 0.2fr 0.2fr 0.2fr"
        templateAreas={`"content1 content2 content3 content4 content5 content6 content7"`}
      >
        <GridItem area="content1">
          <HStack>
            <Avatar src={store?.picture || storePic} size="xl" />
            <Stack>
              <Text
                fontSize="x-large"
                fontWeight="semibold"
                textTransform="capitalize"
                height="35px"
              >
                {store?.storeName}
              </Text>
              <Flex flexDirection={storeLocation ? "row-reverse" : "row"}>
                <OrangeButton mr={productLocation ? "10px" : "0"}>
                  <PiChatCircleDots size="23px" />
                  <Text ml="10px">Chat now</Text>
                </OrangeButton>
                {productLocation ? (
                  <ViewShopButton
                    storeId={store?.storeId ?? 0}
                    storeName={store?.storeName || ""}
                  />
                ) : (
                  <Flex
                    borderRadius="none"
                    alignItems="center"
                    justifyContent="center"
                    border="1px solid"
                    cursor="pointer"
                    width="130px"
                    borderColor="#DCDCDC"
                    _hover={{ bg: "#F8F8F8" }}
                    mr="10px"
                  >
                    <AiOutlinePlusSquare size="25px" />
                    <Text ml="5px">Follow</Text>
                  </Flex>
                )}
              </Flex>
            </Stack>
            <Divider orientation="vertical" height="90px" ml="15px" />
          </HStack>
        </GridItem>
        <GridItem area="content2">
          <Stack mt="20px">
            <Text mr="50px">Ratings</Text>
            <Text mr="50px">Products</Text>
          </Stack>
        </GridItem>
        <GridItem area="content3">
          <Stack mt="20px">
            <Flex alignItems="center">
              <Box color="#FF5722">
                <IoIosStar />
              </Box>
              <Text color="#E64A19" ml="3px">
                {store?.averageRating ?? 0}
              </Text>
            </Flex>
            <Text color="#E64A19">200</Text>
          </Stack>
        </GridItem>
        <GridItem
          area="content4"
          display="flex"
          justifyContent="end"
          whiteSpace="nowrap"
        >
          <Stack mt="20px">
            <Text>Response Rate</Text>
            <Text>Response Time</Text>
          </Stack>
        </GridItem>
        <GridItem area="content5" display="flex" justifyContent="end">
          <Stack mt="20px">
            <Text textAlign="end" color="#E64A19">
              100%
            </Text>
            <Text color="#E64A19" whiteSpace="nowrap">
              within minutes
            </Text>
          </Stack>
        </GridItem>
        <GridItem area="content6" display="flex" justifyContent="end">
          <Stack mt="20px">
            <Text>Joined</Text>
            <Text>Follower</Text>
          </Stack>
        </GridItem>
        <GridItem area="content7" display="flex" justifyContent="end">
          <Stack mt="20px">
            <Text color="#E64A19">8 months ago</Text>
            <Text textAlign="end" color="#E64A19">
              1.5k
            </Text>
          </Stack>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default StoreInfoSection;
