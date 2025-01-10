import {
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import storePic from "../../../../assets/storePic.jpg";
import { Store } from "../../../../entities/Store";

interface Props {
  store?: Store;
}

const StoreInfoSection = ({ store }: Props) => {
  return (
    <Card borderRadius="none" padding={5} mt="10px">
      <Grid
        templateColumns="0.5fr 0.1fr 0.1fr 0.2fr 0.2fr 0.2fr 0.2fr"
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
              <Flex>
                <Button mr="10px">Chat now</Button>
                <Button>View shop</Button>
              </Flex>
            </Stack>
            <Divider orientation="vertical" height="90px" ml="20px" />
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
            <Text color="#E64A19">100</Text>
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
