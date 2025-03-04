import { Flex, Text } from "@chakra-ui/react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

interface Props {
  ratingFilter: number | null;
  setRatingFilter: (value: number | null) => void;
  sortBy: string;
  sortDirection: string;
  minPrice: number | null;
  maxPrice: number | null;
  urlParam: string;
  category?: string;
}

const RatingFilter = ({
  ratingFilter,
  setRatingFilter,
  sortBy,
  sortDirection,
  minPrice,
  maxPrice,
  urlParam,
  category,
}: Props) => {
  const boxStyle = (value: number) => {
    return {
      bg: ratingFilter === value ? "#E0E0E0" : "gray.100",
      cursor: "pointer",
      padding: "4px",
      borderRadius: "full",
      alignItems: "center",
      mt: "3px",
    };
  };

  const updateUrl = (value: number) => {
    let newUrl = `${urlParam}&sortBy=${encodeURIComponent(
      sortBy
    )}&dir=${encodeURIComponent(sortDirection)}&ratingFilter=${value}`;

    if (minPrice) {
      newUrl += `&minPrice=${minPrice.toString()}`;
    }

    if (maxPrice) {
      newUrl += `&maxPrice=${maxPrice.toString()}`;
    }

    if (category) {
      newUrl += `&category=${encodeURIComponent(category)}`;
    }

    window.history.pushState(null, "", newUrl);
    setRatingFilter(value);
  };

  const ratings = [5, 4, 3, 2, 1];

  return (
    <>
      <Text fontWeight="semibold" mt="15px" mb="5px">
        Rating
      </Text>
      {ratings.map((rating) => (
        <Flex
          key={rating}
          onClick={() => updateUrl(rating)}
          {...boxStyle(rating)}
          padding="6px"
        >
          <Flex color="#FF5722" ml="5px">
            {Array.from({ length: 5 }, (_, index) =>
              index < rating ? (
                <IoIosStar key={index} />
              ) : (
                <IoIosStarOutline key={index} />
              )
            )}
          </Flex>
          {rating < 5 && (
            <Text ml="5px" fontSize="sm">
              And Up
            </Text>
          )}
        </Flex>
      ))}
    </>
  );
};

export default RatingFilter;
