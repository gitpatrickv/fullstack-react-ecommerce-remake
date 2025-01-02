import { Card, Text } from "@chakra-ui/react";
import { useShopStore } from "../../../store/shop-store";

const AccountInfoPage = () => {
  const { storeName } = useShopStore();
  return (
    <Card borderRadius="none">
      <Text>asdasd</Text>
    </Card>
  );
};

export default AccountInfoPage;
