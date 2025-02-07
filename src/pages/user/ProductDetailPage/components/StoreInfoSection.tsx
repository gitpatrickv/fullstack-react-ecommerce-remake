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
import { IoIosStar } from "react-icons/io";
import { PiChatCircleDots } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import storePic from "../../../../assets/storePic.jpg";
import OrangeButton from "../../../../components/Button/OrangeButton";
import ViewShopButton from "../../../../components/Button/ViewShopButton";
import { Store } from "../../../../entities/Store";
import { useAuthQueryStore } from "../../../../store/auth-store";
import useGetStoreMetrics from "../hooks/useGetStoreMetrics";
import FollowStoreButton from "./FollowStoreButton";
interface Props {
  store?: Store;
}

const StoreInfoSection = ({ store }: Props) => {
  const time = new Date(store?.createdDate || new Date());
  const location = useLocation();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const productLocation = location.pathname.startsWith("/product");
  const storeLocation = location.pathname.startsWith("/store");
  const { data: storeMetrics } = useGetStoreMetrics(store?.storeId ?? 0);
  return (
    <Card borderRadius="none" padding={5} mt="10px">
      <Grid
        templateColumns="0.6fr 0.1fr 50px 0.2fr 0.2fr 0.2fr 0.2fr"
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
                <OrangeButton
                  mr={productLocation ? "10px" : "0"}
                  isDisabled={!jwtToken}
                >
                  <PiChatCircleDots size="23px" />
                  <Text ml="10px">Chat now</Text>
                </OrangeButton>
                {productLocation ? (
                  <ViewShopButton
                    storeId={store?.storeId ?? 0}
                    storeName={store?.storeName || ""}
                  />
                ) : (
                  <FollowStoreButton storeId={store?.storeId ?? 0} />
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
        <GridItem area="content3" display="flex" justifyContent="end" mr="20px">
          <Stack mt="20px">
            <Flex alignItems="center">
              <Box color="#FF5722">
                <IoIosStar />
              </Box>
              <Text color="#E64A19" ml="2px">
                {store?.averageRating ?? 0}
                <Text as="span" ml="2px">
                  ({store?.reviewsCount})
                </Text>
              </Text>
            </Flex>
            <Text color="#E64A19" textAlign="end">
              {storeMetrics?.productCount ?? 0}
            </Text>
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
            <Text color="#E64A19">
              <ReactTimeAgo date={time} locale="en-US" />
            </Text>
            <Text textAlign="end" color="#E64A19">
              {storeMetrics?.followerCount ?? 0}
            </Text>
          </Stack>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default StoreInfoSection;
