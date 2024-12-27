import { Text } from "@chakra-ui/react";
import { useUserStore } from "../../../store/user-store";

const HomePage = () => {
  const { name } = useUserStore();
  return (
    <>
      <Text>{name}</Text>
    </>
  );
};

export default HomePage;
