import { Box } from "@chakra-ui/react";

interface Props {
  handleImageClick: () => void;
  activeBanner: { key: string; image: string };
  image: { key: string; image: string };
}

const ImageSelector = ({ handleImageClick, activeBanner, image }: Props) => {
  return (
    <Box
      height="12px"
      width="12px"
      borderRadius="full"
      bg={activeBanner.key === image.key ? "#E64A19" : "gray.200"}
      onClick={handleImageClick}
      cursor="pointer"
      transition="background 0.1s linear"
    />
  );
};

export default ImageSelector;
