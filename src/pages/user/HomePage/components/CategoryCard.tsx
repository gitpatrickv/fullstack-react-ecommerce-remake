import { Card, Flex, Image, Text } from "@chakra-ui/react";

interface Props {
  name: string;
  image: string;
}

const CategoryCard = ({ name, image }: Props) => {
  return (
    <>
      <Card
        borderRadius="none"
        cursor="pointer"
        _hover={{
          transform: "scale(1.03)",
          transition: "transform .15s ease-in",
        }}
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
