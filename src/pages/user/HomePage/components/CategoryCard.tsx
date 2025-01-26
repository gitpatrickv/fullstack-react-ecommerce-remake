import { Card, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  image: string;
  value: string;
}

const CategoryCard = ({ name, image, value }: Props) => {
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate(`/category/${value}`);
  };

  return (
    <>
      <Card
        borderRadius="none"
        cursor="pointer"
        _hover={{
          opacity: "0.8",
        }}
        onClick={handleNavigateClick}
      >
        <Flex
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Image src={image} height="80px" width="80px" mt="15px" />
          <Text mt="10px" mb="10px">
            {name}
          </Text>
        </Flex>
      </Card>
    </>
  );
};

export default CategoryCard;
