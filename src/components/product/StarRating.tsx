import { Box } from "@chakra-ui/react";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";

interface Props {
  averageRating: number;
  size?: string;
}

const StarRating = ({ averageRating, size }: Props) => {
  const ratings = [1, 2, 3, 4, 5];

  const isHalfStar = (rate: number) =>
    rate === Math.floor(averageRating) + 1 && averageRating % 1 >= 0.5;
  return (
    <>
      {ratings.map((rate) => (
        <Box
          key={rate}
          color={
            rate <= Math.floor(averageRating) || isHalfStar(rate)
              ? "#FF5722"
              : "#C8C8C8"
          }
        >
          {isHalfStar(rate) ? (
            <IoIosStarHalf size={size} />
          ) : (
            <IoIosStar size={size} />
          )}
        </Box>
      ))}
    </>
  );
};

export default StarRating;
