import { Center, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

const NoSearchResult = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  return (
    <Center flexDirection="column" height="50vh">
      <Text fontSize="xx-large" fontWeight="semibold">
        Oops!
      </Text>
      <Text fontSize="xl" fontWeight="semibold">
        We found no results for your search
      </Text>
      <Text color="#E64A19" fontSize="xl" fontWeight="semibold">
        ' {keyword} '
      </Text>
    </Center>
  );
};

export default NoSearchResult;
