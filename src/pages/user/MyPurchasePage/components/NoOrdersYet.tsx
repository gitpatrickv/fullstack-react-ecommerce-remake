import { Card, Center, Image, Text } from "@chakra-ui/react";
import image from "../../../../assets/list.png";

const NoOrdersYet = () => {
  return (
    <Card mt="10px" borderRadius="none">
      <Center alignItems="center" height="500px" flexDirection="column">
        <Image src={image} boxSize={150} />
        <Text fontWeight="semibold" fontSize="xl" mt="10px">
          No orders yet
        </Text>
      </Center>
    </Card>
  );
};

export default NoOrdersYet;
