import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosStar } from "react-icons/io";
import OrangeButton from "../../../../components/Button/OrangeButton";
import useRateStore, { StoreRateProps } from "../hooks/useRateStore";

interface Props {
  storeId: number;
  orderId: number;
}

const StoreToRate = ({ storeId, orderId }: Props) => {
  const ratingDescriptions: Record<number, string> = {
    5: "Amazing",
    4: "Good",
    3: "Average",
    2: "Below Average",
    1: "Poor",
  };

  const ratings = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState<number>(0);
  const { handleSubmit, setValue } = useForm<StoreRateProps>();
  const { mutate } = useRateStore(storeId, orderId);
  const handleRatingClick = (rate: number) => {
    setRating(rate);
    setValue("rating", rate);
  };

  const onSubmit: SubmitHandler<StoreRateProps> = (data) => {
    mutate(data);
  };

  return (
    <Box paddingX={5} mb="25px">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(onSubmit)(event);
        }}
      >
        <Text fontSize="xl">Store Service</Text>
        <HStack justifyContent="space-between" mt="10px">
          <Flex>
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
          <OrangeButton width="120px" type="submit" isDisabled={rating < 1}>
            Rate
          </OrangeButton>
        </HStack>
      </form>
    </Box>
  );
};

export default StoreToRate;
