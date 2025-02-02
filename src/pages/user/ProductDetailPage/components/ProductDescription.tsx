import { Card, Text } from "@chakra-ui/react";

interface Props {
  description?: string;
}

const ProductDescription = ({ description }: Props) => {
  return (
    <Card padding={5} mt="10px" borderRadius="none" minHeight="110px">
      <Text fontSize="x-large" fontWeight="semibold" mb="10px">
        Product Description
      </Text>
      <Text>{description}</Text>
    </Card>
  );
};

export default ProductDescription;
