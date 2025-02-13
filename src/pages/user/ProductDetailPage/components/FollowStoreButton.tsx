import { Text } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import WhiteButton from "../../../../components/Button/WhiteButton";
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

  const { data: getFollowStoreStatus, isLoading } =
    useGetFollowingStoreStatus(storeId);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <WhiteButton
        isDisabled={!jwtToken}
        onClick={() => followStore()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        mr="10px"
        isLoading={isLoading}
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
      </WhiteButton>
    </>
  );
};

export default FollowStoreButton;
