import {
  Avatar,
  Card,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import pic from "../../../../assets/profpic.jpeg";
import OrangeButton from "../../../../components/Button/OrangeButton";
import StarRating from "../../../../components/product/StarRating";
import { ProductReview } from "../../../../entities/ProductReview";

interface Props {
  review: ProductReview;
}

const ManageReviewList = ({ review }: Props) => {
  return (
    <>
      <Card borderRadius="none" py={2} px={5} mt="10px">
        <HStack>
          <Avatar src={review.imageUrl || pic} size="sm" />
          <Text fontWeight="semibold" textTransform="capitalize">
            {review.name}
          </Text>
        </HStack>
      </Card>
      <Card borderRadius="none" padding={5}>
        <Grid
          templateColumns="0.2fr 0.6fr 0.2fr"
          templateAreas={`"product review action"`}
        >
          <GridItem
            area="product"
            borderRight="1px solid"
            borderColor="#E8E8E8"
          >
            <HStack>
              <Image src={pic} boxSize="80px" />
              <Text ml="10px" fontWeight="semibold">
                Product Name
              </Text>
            </HStack>
          </GridItem>
          <GridItem area="review" ml="20px" mr="20px">
            <Flex alignItems="center">
              <Text mr="10px">Rating:</Text>
              <StarRating averageRating={review.rating} />
            </Flex>
            {review.customerReview && (
              <Text>Review: {review.customerReview}</Text>
            )}
            {review.sellerResponse && (
              <Card
                padding={2}
                mt="10px"
                border="1px solid gray"
                borderColor="#E8E8E8"
                borderRadius="none"
              >
                <Text fontWeight="semibold" color="#E64A19">
                  Your Response:
                </Text>
                <Text>{review.sellerResponse}</Text>
              </Card>
            )}
          </GridItem>
          <GridItem
            area="action"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderLeft="1px solid"
            borderColor="#E8E8E8"
          >
            <OrangeButton width="150px">Reply</OrangeButton>
          </GridItem>
        </Grid>
      </Card>
    </>
  );
};

export default ManageReviewList;
