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
            bg="orange.500"
            borderRadius="none"
            _hover={{ bg: "orange.600" }}
          />
        </InputRightElement>
      </InputGroup>
      {/* </form> */}
    </>
  );
};

export default Search;
