import { Flex, Text } from "@chakra-ui/react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

interface Props {
  ratingFilter: number | null;
  setRatingFilter: (value: number | null) => void;
  sortBy: string;
  minPrice: number | null;
  maxPrice: number | null;
}

const RatingFilter = ({
  ratingFilter,
  setRatingFilter,
  sortBy,
  minPrice,
  maxPrice,
}: Props) => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
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
    let newUrl = `/search?keyword=${encodeURIComponent(
      keyword
    )}&sortBy=${encodeURIComponent(sortBy)}&ratingFilter=${value}`;

    if (minPrice) {
      newUrl += `&minPrice=${minPrice.toString()}`;
    }

    if (maxPrice) {
      newUrl += `&maxPrice=${maxPrice.toString()}`;
    }

    window.history.pushState(null, "", newUrl);
    setRatingFilter(value);
  };

  const ratings = [1, 2, 3, 4, 5];

  return (
    <>
      <Text fontWeight="semibold" mt="15px" mb="5px">
        Rating
      </Text>
      {ratings.reverse().map((rating) => (
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
