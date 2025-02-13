import { Box, Center, Skeleton } from "@chakra-ui/react";

const ProductDetailPageSkeleton = () => {
  return (
    <Center mt="10px">
      <Box minWidth="1200px">
        <Skeleton height="600px" />
        <Skeleton height="130px" mt="10px" />
        <Skeleton height="110px" mt="10px" />
      </Box>
    </Center>
  );
};

export default ProductDetailPageSkeleton;
