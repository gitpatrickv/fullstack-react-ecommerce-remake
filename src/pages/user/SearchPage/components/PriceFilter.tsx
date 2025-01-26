import { Divider, Flex, Input, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import OrangeButton from "../../../../components/Button/OrangeButton";

interface Props {
  minPrice: number | null;
  setMinPrice: (value: number | null) => void;
  maxPrice: number | null;
  setMaxPrice: (value: number | null) => void;
  ratingFilter: number | null;
  sortBy: string;
}

const PriceFilter = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  ratingFilter,
  sortBy,
}: Props) => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const minPriceRef = useRef<HTMLInputElement>(null);
  const maxPriceRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const minPriceValue = minPriceRef.current?.value
      ? Number(minPriceRef.current.value)
      : null;
    const maxPriceValue = maxPriceRef.current?.value
      ? Number(maxPriceRef.current.value)
      : null;

    setMinPrice(minPriceValue);
    setMaxPrice(maxPriceValue);

    let newUrl = `/search?keyword=${encodeURIComponent(
      keyword
    )}&sortBy=${encodeURIComponent(sortBy)}`;

    if (ratingFilter) {
      newUrl += `&ratingFilter=${ratingFilter.toString()}`;
    }

    if (minPriceValue) {
      newUrl += `&minPrice=${minPriceValue?.toString()}`;
    }

    if (maxPriceValue) {
      newUrl += `&maxPrice=${maxPriceValue?.toString()}`;
    }

    window.history.pushState(null, "", newUrl);
  };

  return (
    <>
      <Text fontWeight="semibold" mt="15px">
        Price Range
      </Text>
      <form onSubmit={handleSubmit}>
        <Flex alignItems="center" mt="10px">
          <Input
            placeholder="₱ Min"
            mr="10px"
            borderRadius="none"
            type="number"
            ref={minPriceRef}
            defaultValue={minPrice || ""}
          />
          <Divider width="50px" borderColor="black" />
          <Input
            placeholder="₱ Max"
            ml="10px"
            borderRadius="none"
            type="number"
            ref={maxPriceRef}
            defaultValue={maxPrice || ""}
          />
        </Flex>
        <OrangeButton width="100%" mt="20px" type="submit">
          Apply
        </OrangeButton>
      </form>
    </>
  );
};

export default PriceFilter;
