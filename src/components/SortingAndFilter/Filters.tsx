import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { CiFilter } from "react-icons/ci";
import OrangeButton from "../Button/OrangeButton";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

interface Props {
  ratingFilter: number | null;
  sortBy: string;
  sortDirection: string;
  minPrice: number | null;
  maxPrice: number | null;
  setMaxPrice: (value: number | null) => void;
  setMinPrice: (value: number | null) => void;
  setRatingFilter: (value: number | null) => void;
  handleResetFilterClick: () => void;
  urlParam: string;
}

const Filters = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  ratingFilter,
  sortBy,
  sortDirection,
  urlParam,
  setRatingFilter,
  handleResetFilterClick,
}: Props) => {
  return (
    <Box width="250px" mr="30px">
      <Flex alignItems="center">
        <CiFilter size="25px" />
        <Text fontSize="lg" fontWeight="semibold" ml="10px">
          SEARCH FILTER
        </Text>
      </Flex>
      <RatingFilter
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        sortBy={sortBy}
        sortDirection={sortDirection}
        minPrice={minPrice}
        maxPrice={maxPrice}
        urlParam={urlParam || ""}
      />
      <Divider mt="15px" mb="15px" borderColor="#BEBEBE" />
      <PriceFilter
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        ratingFilter={ratingFilter}
        sortBy={sortBy}
        sortDirection={sortDirection}
        urlParam={urlParam || ""}
      />
      <Divider mt="30px" mb="30px" borderColor="#BEBEBE" />
      <OrangeButton width="100%" onClick={handleResetFilterClick}>
        CLEAR ALL
      </OrangeButton>
    </Box>
  );
};

export default Filters;
