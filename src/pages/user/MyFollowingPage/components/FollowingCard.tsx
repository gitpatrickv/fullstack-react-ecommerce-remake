import { Card, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import storePic from "../../../../assets/storePic.jpg";
import OrangeButton from "../../../../components/Button/OrangeButton";
import { GetFollowedStoreProps } from "../hooks/useGetAllFollowedStores";
import useFollowStore from "../../ProductDetailPage/hooks/useFollowStore";

interface Props {
  list: GetFollowedStoreProps;
}

const FollowingCard = ({ list }: Props) => {
  const navigate = useNavigate();
  const formattedStoreName = list.storeName.toLowerCase().replace(/ /g, "-");
  const handleNavigateStoreClick = () => {
    navigate(`/store/${list.storeId}/${formattedStoreName}`);
  };
  const { mutate: followStore } = useFollowStore(list.storeId);

  return (
    <>
      <Card padding={4} borderRadius="none">
        <Flex alignItems="center">
          <Image
            src={list.imageUrl || storePic}
            boxSize="90px"
            cursor="pointer"
            onClick={handleNavigateStoreClick}
          />
          <Text
            ml="10px"
            isTruncated={true}
            cursor="pointer"
            textTransform="capitalize"
            fontWeight="semibold"
            maxWidth="200px"
            onClick={handleNavigateStoreClick}
          >
            {list.storeName}
          </Text>
          <Spacer />
          <OrangeButton onClick={() => followStore()}>Unfollow</OrangeButton>
        </Flex>
      </Card>
    </>
  );
};

export default FollowingCard;
