import { Avatar, Box, Card, Flex, Stack, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import pic from "../../../assets/profpic.jpeg";
import OrangeButton from "../../../components/Button/OrangeButton";
import { useUserStore } from "../../../store/user-store";
import useUploadUserAvatar from "./hooks/useUploadUserAvatar";
const AccountProfilePage = () => {
  const { name, email, picture, gender } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadAvatar = useUploadUserAvatar();

  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadAvatar.mutate({ file: file });
    }
  };

  return (
    <>
      <Card borderRadius="none" mb="10px">
        <Box padding="17px">
          <Text fontSize="xl" fontWeight="semibold">
            My Profile
          </Text>
        </Box>
      </Card>
      <Card borderRadius="none">
        <Flex justifyContent="space-evenly" padding={10}>
          <Stack mt="30px" width="400px">
            <Flex>
              <Text mr="30px">Name</Text>
              <Text>{name}</Text>
            </Flex>
            <Flex>
              <Text mr="35px">Email</Text>
              <Text>{email}</Text>
            </Flex>
            <Flex>
              <Text mr="21px">Gender</Text>
              <Text>{gender}</Text>
            </Flex>
          </Stack>
          <Flex flexDirection="column" alignItems="center">
            <Avatar src={picture || pic} size="2xl" />
            <input
              type="file"
              accept=".jpeg, .png"
              ref={fileInputRef}
              onChange={handleUploadImage}
              style={{ display: "none" }}
            />
            <OrangeButton onClick={handleInputClick} mt="20px">
              <FaCamera size="20px" />
              <Text ml="10px">Select Image</Text>
            </OrangeButton>
            <Text mt="10px" whiteSpace="nowrap">
              File size: maximum 1 MB
            </Text>
            <Text whiteSpace="nowrap">File extension: .JPEG, .PNG</Text>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};

export default AccountProfilePage;
