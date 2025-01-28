import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { CiFilter } from "react-icons/ci";
import OrangeButton from "../Button/OrangeButton";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import CategoryFilter from "./CategoryFilter";
import { StoreCategoriesProps } from "../../pages/user/StorePage/hooks/useGetStoreCategories";

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
  isCategory: boolean;
  getStoreCategories?: StoreCategoriesProps | undefined;
  category?: string;
  setCategory?: (value: string) => void;
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
  isCategory,
  getStoreCategories,
  category,
  setCategory,
}: Props) => {
  return (
    <Box width="250px" mr="30px" mb="50px">
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
        category={category}
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
        category={category}
      />
      {isCategory && (
        <>
          <Divider mt="25px" mb="15px" borderColor="#BEBEBE" />
          <CategoryFilter
            getStoreCategories={getStoreCategories}
            category={category}
            setCategory={setCategory}
            urlParam={urlParam || ""}
            ratingFilter={ratingFilter}
            minPrice={minPrice}
            maxPrice={maxPrice}
            sortBy={sortBy}
            sortDirection={sortDirection}
          />
        </>
      )}
      <Divider mt="20px" mb="20px" borderColor="#BEBEBE" />
      <OrangeButton width="100%" onClick={handleResetFilterClick}>
        CLEAR ALL
      </OrangeButton>
    </Box>
  );
};

export default Filters;
