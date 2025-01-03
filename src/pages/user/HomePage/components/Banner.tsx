import { Flex, Grid, GridItem, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import banner1 from "../../../../assets/banner1.png";
import banner2 from "../../../../assets/banner2.png";
import banner3 from "../../../../assets/banner3.png";
import banner4 from "../../../../assets/banner4.png";
import banner5 from "../../../../assets/banner5.png";
import banner6 from "../../../../assets/banner6.png";
import banner7 from "../../../../assets/banner7.png";
import ImageSelector from "./ImageSelector";

const Banner = () => {
  const banners = [
    { key: "1", image: banner1 },
    { key: "2", image: banner2 },
    { key: "3", image: banner3 },
    { key: "4", image: banner4 },
    { key: "5", image: banner5 },
    { key: "6", image: banner6 },
    { key: "7", image: banner7 },
  ];

  const [activeBanner, setActiveBanner] = useState<(typeof banners)[0]>(
    banners[0]
  );
  const [nextImageIndex, setNextImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextImage = (nextImageIndex + 1) % banners.length;
      setActiveBanner(banners[nextImage]);
      setNextImageIndex(nextImage);
    }, 1000);
    return () => clearInterval(timer);
  }, [activeBanner, nextImageIndex]);

  const handleImageClick = (index: number) => {
    setActiveBanner(banners[index]);
    setNextImageIndex(index);
  };

  return (
    <Grid
      templateColumns="0.65fr 0.35fr"
      templateAreas={"'left right'"}
      mb="10px"
      maxHeight="250px"
      height="250px"
    >
      <GridItem area="left" position="relative" bg="blue">
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
      </GridItem>

      <GridItem area="right" position="relative" ml="6px">
        <Image
          src={banners[5].image}
          width="100%"
          maxHeight="122px"
          height="122px"
        />
        <Image
          mt="6px"
          src={banners[6].image}
          width="100%"
          maxHeight="122px"
          height="122px"
        />
      </GridItem>
    </Grid>
  );
};

export default Banner;
