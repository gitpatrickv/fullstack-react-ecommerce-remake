import { Button, Flex, Image } from "@chakra-ui/react";
import { useRef } from "react";
import { ProductImage } from "../../../../entities/ProductImage";

interface Props {
  images?: ProductImage[];
}

const ProductImages = ({ images }: Props) => {
  if (!images || images.length === 0) {
    return null;
  }

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
    <>
      <Image src={images[0]?.productImage} boxSize="450px" />
      <Flex
        ref={scrollRef}
        overflowX="auto"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        {images.map((image) => (
          <Image
            key={image.imageId}
            src={image.productImage}
            boxSize="100px"
            border="1px solid"
            borderColor="#E8E8E8"
            mr="5px"
            padding={2}
            _hover={{ borderColor: "#E64A19" }}
            cursor="pointer"
          />
        ))}
      </Flex>
      <Button onClick={() => handleScroll("right")}>right</Button>
      <Button onClick={() => handleScroll("left")}>left</Button>
    </>
  );
};

export default ProductImages;
