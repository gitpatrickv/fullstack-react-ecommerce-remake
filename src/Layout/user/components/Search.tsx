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
import { useNavigate, useSearchParams } from "react-router-dom";
import useSearchProduct from "../../../pages/user/SearchPage/hooks/useSearchProduct";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const query = searchParams.get("keyword") || "";

  const { data: search } = useSearchProduct({
    pageSize: 5,
    search: keyword,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setKeyword(text);
    setShowSuggestions(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    setShowSuggestions(false);
  };

  const handleNavigateClick = (product: string) => {
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
            defaultValue={query}
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
          {search?.pages.flatMap((page) =>
            page.models.map((product) => (
              <Box
                key={product.productId}
                px={4}
                py={2}
                cursor="pointer"
                _hover={{ bg: "#F8F8F8" }}
                onClick={() =>
                  handleNavigateClick(product.productName.toLowerCase())
                }
              >
                <Text textTransform="lowercase">{product.productName}</Text>
              </Box>
            ))
          )}
        </Card>
      )}
    </Box>
  );
};

export default Search;
