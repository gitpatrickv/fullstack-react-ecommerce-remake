import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("a");
  const query = searchParams.get("keyword") || "";
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setKeyword(text);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            borderRadius="none"
            placeholder="Search..."
            variant="filled"
            onChange={handleInputChange}
            border="none"
            _hover={{ border: "none" }}
            _focus={{
              boxShadow: "none",
              border: "none",
              bg: "gray.100",
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
    </>
  );
};

export default Search;
