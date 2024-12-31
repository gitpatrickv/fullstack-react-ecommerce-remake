import { Center, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useGetOne from "../../../hooks/useGetOne";
import { ProductModels } from "../../../entities/Product";

const ProductDetailPage = () => {
  const params = useParams<{ productId: string }>();
  const productId = params.productId;
  const { data: getProductDetail } = useGetOne<ProductModels>({
    module: "product",
    id: productId!,
  });

  return (
    <Center>
      <Text>{getProductDetail?.productName}</Text>
      <Text>{getProductDetail?.description}</Text>
    </Center>
  );
};

export default ProductDetailPage;
