import { Avatar, Box, Card, Flex, Text } from "@chakra-ui/react";
import { MdVerified } from "react-icons/md";
import pic from "../../../../assets/profpic.jpeg";
import StarRating from "../../../../components/product/StarRating";
import { ProductReview } from "../../../../entities/ProductReview";

interface Props {
  productReview: ProductReview;
}

const UserReview = ({ productReview }: Props) => {
  return (
    <Box padding={3}>
      <Flex>
        <Avatar src={productReview.imageUrl || pic} size="sm" />
        <Box ml="10px" position="relative" top="-5px">
          <Flex alignItems="center">
            <Text mr="10px" textTransform="capitalize">
              {productReview.name}
            </Text>
            <MdVerified color="#1877F2" />
            <Text ml="2px" fontSize="xs">
              Verified Purchase
            </Text>
          </Flex>
          <Flex>
            <StarRating averageRating={productReview.rating} />
          </Flex>
          <Text>{productReview.createdDate}</Text>
        </Box>
      </Flex>

      <Text ml="42px">{productReview?.customerReview}</Text>
      {productReview.sellerResponse && (
        <Card
          ml="42px"
          padding={4}
          mt="20px"
          bg="#F8F8F8"
          borderRadius="none"
          position="relative"
        >
          <Box
            borderLeft="8px solid transparent"
            borderRight="8px solid transparent"
            borderBottom="18px solid #F8F8F8"
            position="absolute"
            top="-18px"
            left="40px"
          />
          <Text fontWeight="semibold" color="#E64A19">
            Seller's Response:
          </Text>
          <Text mt="10px">{productReview?.sellerResponse} asdasd</Text>
        </Card>
      )}
    </Box>
  );
};

export default UserReview;
