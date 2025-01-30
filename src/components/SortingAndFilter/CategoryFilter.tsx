import { Checkbox, Flex, Text } from "@chakra-ui/react";
import { StoreCategoriesProps } from "../../pages/user/StorePage/hooks/useGetStoreCategories";

interface Props {
  getStoreCategories?: StoreCategoriesProps | undefined;
  category?: string;
  setCategory?: (value: string) => void;
  ratingFilter: number | null;
  sortBy: string;
  sortDirection: string;
  minPrice: number | null;
  maxPrice: number | null;
  urlParam: string;
}

const CategoryFilter = ({
  getStoreCategories,
  category,
  setCategory,
  ratingFilter,
  sortBy,
  sortDirection,
  minPrice,
  maxPrice,
  urlParam,
}: Props) => {
  const updateUrl = (value: string) => {
    let newUrl = `${urlParam}&sortBy=${encodeURIComponent(
      sortBy
    )}&dir=${encodeURIComponent(sortDirection)}`;

    if (ratingFilter) {
      newUrl += `&ratingFilter=${ratingFilter.toString()}`;
    }

    if (minPrice) {
      newUrl += `&minPrice=${minPrice.toString()}`;
    }

    if (maxPrice) {
      newUrl += `&maxPrice=${maxPrice.toString()}`;
    }

    if (category) {
      newUrl += `&category=${encodeURIComponent(value)}`;
    }

    if (setCategory) {
      setCategory(value);
    }

    window.history.pushState(null, "", newUrl);
  };

  return (
    <>
      <Text fontWeight="semibold" mb="5px">
        Categories
      </Text>
      {getStoreCategories?.map((c) => (
        <Flex alignItems="center" key={c.category}>
          <Checkbox
            onChange={() => updateUrl(c.category)}
            isChecked={c.category === category}
            colorScheme="orange"
          />
          <Text
            ml="10px"
            cursor="pointer"
            onClick={() => updateUrl(c.category)}
          >
            {c.category.replace(/_/g, " ")}
          </Text>
        </Flex>
      ))}
    </>
  );
};

export default CategoryFilter;
