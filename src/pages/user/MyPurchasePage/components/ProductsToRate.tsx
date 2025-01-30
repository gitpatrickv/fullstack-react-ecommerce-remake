import {
  Badge,
  Box,
  Center,
  Flex,
  FormControl,
  HStack,
  Image,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosStar } from "react-icons/io";
import OrangeButton from "../../../../components/Button/OrangeButton";
import { OrderItem } from "../../../../entities/OrderItem";
import useRateProduct, { RateProps } from "../hooks/useRateProduct";
interface Props {
  orderItem: OrderItem;
  orderId: number;
}

const ProductsToRate = ({ orderItem, orderId }: Props) => {
  const ratingDescriptions: Record<number, string> = {
    5: "Amazing",
    4: "Good",
    3: "Average",
    2: "Below Average",
    1: "Poor",
  };

  const ratings = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState<number>(0);
  const { register, handleSubmit, setValue } = useForm<RateProps>();
  const { mutate } = useRateProduct(orderItem.productId, orderId);

  const handleRatingClick = (rate: number) => {
    setRating(rate);
    setValue("rating", rate);
  };

  const onSubmit: SubmitHandler<RateProps> = (data) => {
    mutate(data);
  };

  return (
    <Box padding={5}>
      <Flex>
        <Image src={orderItem.productImage} boxSize="80px" />
        <Text
          textTransform="capitalize"
          ml="10px"
          fontSize="xl"
          fontWeight="semibold"
        >
          {orderItem.productName}
        </Text>
        <Spacer />
        {orderItem.reviewStatus === "REVIEWED" && (
          <Center>
            <Badge variant="solid" colorScheme="orange">
              RATED
            </Badge>
          </Center>
        )}
      </Flex>
      {orderItem.reviewStatus === "TO_REVIEW" && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(onSubmit)(event);
          }}
        >
          <HStack mt="10px">
            <Text fontSize="xl">Product Quality</Text>
            <Flex ml="30px">
              {ratings.map((rate) => (
                <IoIosStar
                  key={rate}
                  size="30px"
                  color={rate <= rating ? "#FF5722" : "gray"}
                  cursor="pointer"
                  onClick={() => handleRatingClick(rate)}
                />
              ))}
              {rating > 0 && (
                <Text color="#FF5722" fontSize="xl" ml="20px">
                  {ratingDescriptions[rating]}
                </Text>
              )}
            </Flex>
          </HStack>
          {rating > 0 && (
            <FormControl mt="10px">
              <Text fontSize="xl">Review</Text>
              <Textarea
                {...register("customerReview")}
                placeholder="Share more thoughts on the product to help other buyers."
              />
            </FormControl>
          )}
          <Flex justifyContent="end" mt="20px">
            <OrangeButton width="120px" type="submit" isDisabled={rating < 1}>
              Rate
            </OrangeButton>
          </Flex>
        </form>
      )}
    </Box>
  );
};

export default ProductsToRate;
