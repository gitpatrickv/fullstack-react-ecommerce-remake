import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useAuthQueryStore } from "../../../../store/auth-store";
import useFollowStore from "../hooks/useFollowStore";
import useGetFollowingStoreStatus from "../hooks/useGetFollowingStoreStatus";

interface Props {
  storeId: number;
}

const FollowStoreButton = ({ storeId }: Props) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  const { mutate: followStore } = useFollowStore(storeId);
  const handleFollowStoreClick = () => {
    followStore();
  };

  const { data: getFollowStoreStatus } = useGetFollowingStoreStatus(storeId);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <Button
        borderRadius="none"
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        cursor="pointer"
        width="130px"
        bg="none"
        borderColor="#DCDCDC"
        _hover={{ bg: "#F8F8F8" }}
        mr="10px"
        isDisabled={!jwtToken}
        onClick={handleFollowStoreClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {getFollowStoreStatus?.following ? (
          isHovered ? (
            "Unfollow"
          ) : (
            "Following"
          )
        ) : (
          <>
            <AiOutlinePlusSquare size="25px" />
            <Text ml="5px">Follow</Text>
          </>
        )}
      </Button>
    </>
  );
};

export default FollowStoreButton;
