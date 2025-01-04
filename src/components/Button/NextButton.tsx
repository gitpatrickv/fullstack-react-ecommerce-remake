import { Flex } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface Props {
  direction: "left" | "right";
  nextClick: () => void;
}

const NextButton = ({ direction, nextClick }: Props) => {
  return (
    <Flex
      aria-label={direction === "left" ? "Left" : "Right"}
      color="white"
      bg="rgba(0, 0, 0, 0.25)"
      _hover={{ bg: "rgba(0, 0, 0, 0.25)" }}
      onClick={nextClick}
      height="40px"
      width="25px"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
    >
      {direction === "left" ? (
        <FaChevronLeft size="20px" />
      ) : (
        <FaChevronRight size="20px" />
      )}{" "}
    </Flex>
  );
};

export default NextButton;
