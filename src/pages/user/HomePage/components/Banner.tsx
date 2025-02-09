import { Box, Flex, Grid, GridItem, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import banner1 from "../../../../assets/banner1.png";
import banner10 from "../../../../assets/banner10.png";
import banner11 from "../../../../assets/banner11.png";
import banner12 from "../../../../assets/banner12.png";
import banner3 from "../../../../assets/banner3.png";
import banner5 from "../../../../assets/banner5.png";
import banner7 from "../../../../assets/banner7.png";
import banner9 from "../../../../assets/banner9.png";
import NextButton from "../../../../components/Button/NextButton";
import ImageSelector from "./ImageSelector";

const Banner = () => {
  const [isHover, setIsHover] = useState(false);
  const banners = [
    { key: "1", image: banner1 },
    { key: "2", image: banner3 },
    { key: "3", image: banner5 },
    { key: "4", image: banner7 },
    { key: "5", image: banner9 },
    { key: "6", image: banner10 },
    { key: "7", image: banner11 },
    { key: "8", image: banner12 },
  ];

  const [activeBanner, setActiveBanner] = useState<(typeof banners)[0]>(
    banners[0]
  );
  const [nextImageIndex, setNextImageIndex] = useState(0);

  const nextRightImage = () => {
    const nextImage = (nextImageIndex + 1) % banners.length;
    setActiveBanner(banners[nextImage]);
    setNextImageIndex(nextImage);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextRightImage();
    }, 3000);
    return () => clearInterval(timer);
  }, [activeBanner, nextImageIndex]);

  const handleImageClick = (index: number) => {
    setActiveBanner(banners[index]);
    setNextImageIndex(index);
  };

  const handleNextRightClick = () => {
    nextRightImage();
  };

  const handleNextLeftClick = () => {
    const nextImage = (nextImageIndex - 1 + banners.length) % banners.length;
    setActiveBanner(banners[nextImage]);
    setNextImageIndex(nextImage);
  };

  return (
    <Grid
      templateColumns="0.65fr 0.35fr"
      templateAreas={"'left right'"}
      mb="10px"
      maxHeight="250px"
      height="250px"
      userSelect="none"
    >
      <GridItem
        area="left"
        position="relative"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Flex justifyContent="center">
          <Flex position="absolute" bottom="2" gap={3}>
            {banners.map((image, index) => (
              <ImageSelector
                key={image.key}
                handleImageClick={() => handleImageClick(index)}
                activeBanner={activeBanner}
                image={image}
              />
            ))}
          </Flex>
        </Flex>

        <Image
          src={activeBanner?.image}
          width="100%"
          maxHeight="250px"
          height="250px"
        />
        {isHover && (
          <>
            <Box position="absolute" left="0" top="105px">
              <NextButton direction="left" nextClick={handleNextLeftClick} />
            </Box>
            <Box position="absolute" right="0" top="105px">
              <NextButton direction="right" nextClick={handleNextRightClick} />
            </Box>
          </>
        )}
      </GridItem>

      <GridItem area="right" position="relative" ml="6px">
        <Image
          src={banners[6].image}
          width="100%"
          maxHeight="122px"
          height="122px"
        />
        <Image
          mt="6px"
          src={banners[7].image}
          width="100%"
          maxHeight="122px"
          height="122px"
        />
      </GridItem>
    </Grid>
  );
};

export default Banner;
