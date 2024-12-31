import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  return (
    <>
      {/* <form onSubmit={handleSubmit}>  */}
      <InputGroup>
        <Input
          // ref={ref}
          borderRadius="none"
          placeholder="Search..."
          variant="filled"
          // defaultValue={query}
          border="none"
          _hover={{ border: "none" }}
          _focus={{
            boxShadow: "none",
            border: "none",
            bg: "gray.100",
          }}
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
          />
        </InputRightElement>
      </InputGroup>
      {/* </form> */}
    </>
  );
};

export default Search;
