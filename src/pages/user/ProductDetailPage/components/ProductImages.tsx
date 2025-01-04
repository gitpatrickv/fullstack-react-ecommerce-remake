import { Box, Flex, Image } from "@chakra-ui/react";
import { useRef, useState } from "react";
import NextButton from "../../../../components/Button/NextButton";
import { ProductImage } from "../../../../entities/ProductImage";

interface Props {
  images?: ProductImage[];
}

const ProductImages = ({ images }: Props) => {
  if (!images || images.length === 0) {
    return null;
  }

  const [imageIndex, setImageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box position="relative">
      {images.length >= 5 && (
        <Box position="absolute" bottom="7">
          <NextButton direction="left" nextClick={() => handleScroll("left")} />
        </Box>
      )}

      <Image src={images[imageIndex]?.productImage} boxSize="450px" />
      <Flex
        ref={scrollRef}
        overflowX="auto"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
        mt="20px"
      >
        {images.map((image, index) => (
          <Image
            key={image.imageId}
            src={image.productImage}
            boxSize="100px"
            mr="5px"
            _hover={{
              border: "2px solid",
              borderColor: "#E64A19",
            }}
            cursor="pointer"
            onMouseEnter={() => setImageIndex(index)}
          />
        ))}
      </Flex>
      {images.length >= 5 && (
        <Box position="absolute" right="0" bottom="7">
          <NextButton
            direction="right"
            nextClick={() => handleScroll("right")}
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductImages;
