import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useProductFilters = () => {
  const [searchParams] = useSearchParams();
  const sortingParam = searchParams.get("sortBy") || "";
  const [sortBy, setSortBy] = useState(sortingParam || "productName");

  const sortDirectionParam = searchParams.get("dir") || "";
  const [sortDirection, setSortDirection] = useState(
    sortDirectionParam || "ASC"
  );

  const ratingFilterFromUrl = searchParams.get("ratingFilter");
  const ratingParam = ratingFilterFromUrl ? Number(ratingFilterFromUrl) : null;
  const [ratingFilter, setRatingFilter] = useState<number | null>(ratingParam);

  const minPriceFilterFromUrl = searchParams.get("minPrice");
  const minPriceParam = minPriceFilterFromUrl
    ? Number(minPriceFilterFromUrl)
    : null;
  const [minPrice, setMinPrice] = useState<number | null>(minPriceParam);

  const maxPriceFilterFromUrl = searchParams.get("maxPrice");
  const maxPriceParam = maxPriceFilterFromUrl
    ? Number(maxPriceFilterFromUrl)
    : null;
  const [maxPrice, setMaxPrice] = useState<number | null>(maxPriceParam);

  const resetFilters = () => {
    setRatingFilter(null);
    setSortBy("productName");
    setSortDirection("ASC");
    setMinPrice(null);
    setMaxPrice(null);
  };

  const setFilters = () => {
    if (ratingParam) setRatingFilter(ratingParam);
    if (sortingParam) setSortBy(sortingParam);
    if (sortDirectionParam) setSortDirection(sortDirectionParam);
    if (minPriceParam) setMinPrice(minPriceParam);
    if (maxPriceParam) setMaxPrice(maxPriceParam);
  };

  return {
    sortBy,
    setSortBy,
    sortingParam,
    sortDirection,
    setSortDirection,
    sortDirectionParam,
    ratingFilter,
    setRatingFilter,
    ratingParam,
    minPrice,
    setMinPrice,
    minPriceParam,
    maxPrice,
    setMaxPrice,
    maxPriceParam,
    resetFilters,
    setFilters,
  };
};
