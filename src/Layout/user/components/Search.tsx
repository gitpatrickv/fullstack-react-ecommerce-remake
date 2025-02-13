import {
  Box,
  Card,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useSearchProduct from "../../../pages/user/SearchPage/hooks/useSearchProduct";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const { data: search } = useSearchProduct({
    pageSize: 15,
    search: keyword,
    sortBy: "productName",
    sortDirection: "ASC",
    ratingFilter: null,
    minPrice: null,
    maxPrice: null,
  });

  const searchResults = search?.pages.flatMap((page) => page.models) || [];
  const searchLength = searchResults.length;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setKeyword(text);
    setShowSuggestions(true);
    setFocusedIndex(-1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    setShowSuggestions(false);
  };

  const handleNavigateClick = (product: string) => {
    setKeyword(product);
    navigate(`/search?keyword=${encodeURIComponent(product)}`);
    setShowSuggestions(false);
  };

  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        event.target instanceof HTMLElement &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    let nextIndexCount = 0;

    if (key === "ArrowDown") nextIndexCount = (focusedIndex + 1) % searchLength;

    if (key === "ArrowUp")
      nextIndexCount = (focusedIndex - 1 + searchLength) % searchLength;

    if (key === "Enter" && focusedIndex >= 0) {
      const selectedProduct = searchResults[focusedIndex];
      if (selectedProduct) {
        const productName = selectedProduct.productName.toLowerCase();
        handleNavigateClick(productName);
      }
    }

    if (key === "Escape") {
      setKeyword("");
      setShowSuggestions(false);
    }

    setFocusedIndex(nextIndexCount);
  };

  return (
    <Box position="relative">
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            borderRadius="none"
            placeholder="Search..."
            variant="filled"
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            border="none"
            bg="white"
            _hover={{ border: "none" }}
            _focus={{
              boxShadow: "none",
              border: "none",
              bg: "white",
            }}
            value={keyword}
            onKeyDown={handleKeyDown}
          />
          <InputRightElement>
            <IconButton
              aria-label="Search"
              icon={<BsSearch />}
              type="submit"
              bg="#E64A19"
              borderRadius="none"
              _hover={{ bg: "#FF5722" }}
              _active={{ bg: "#E64A19" }}
              borderWidth="2px"
              borderColor="white"
              color="white"
            />
          </InputRightElement>
        </InputGroup>
      </form>
      {keyword && showSuggestions && (
        <Card
          position="absolute"
          borderRadius="none"
          width="100%"
          zIndex={10}
          ref={suggestionsRef}
        >
          {search?.pages.map((page, pageIndex) =>
            pageIndex === 0
              ? page.models.map((product, index) => (
                  <Box
                    key={product.productId}
                    px={4}
                    py={2}
                    cursor="pointer"
                    _hover={{ bg: "	#F5F5F5" }}
                    bg={focusedIndex === index ? "	#F5F5F5" : "transparent"}
                    onClick={() =>
                      handleNavigateClick(product.productName.toLowerCase())
                    }
                  >
                    <Text textTransform="lowercase">{product.productName}</Text>
                  </Box>
                ))
              : null
          )}
        </Card>
      )}
    </Box>
  );
};

export default Search;
