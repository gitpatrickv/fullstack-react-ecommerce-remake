import { Card, SimpleGrid, Text } from "@chakra-ui/react";
import accessories from "../../../../assets/accessories.png";
import audio from "../../../../assets/audio.png";
import baby_bottle from "../../../../assets/baby_bottle.png";
import bags from "../../../../assets/bags.png";
import bear from "../../../../assets/bear.png";
import camera from "../../../../assets/camera.png";
import computer from "../../../../assets/computer.png";
import grocery from "../../../../assets/grocery.png";
import helmet from "../../../../assets/helmet.png";
import home_appliance from "../../../../assets/home_appliances.png";
import office from "../../../../assets/office_supply.png";
import personal_care from "../../../../assets/personal_care.png";
import shirt from "../../../../assets/shirt.png";
import shoes from "../../../../assets/shoes.png";
import smartphone from "../../../../assets/smartphone.png";
import sport from "../../../../assets/sport.png";
import CategoryCard from "./CategoryCard";

const Category = () => {
  const categories = [
    { key: "1", name: "Motors", image: helmet, value: "Motors" },
    {
      key: "2",
      name: "Home Appliances",
      image: home_appliance,
      value: "Home_Appliances",
    },
    { key: "3", name: "Apparel", image: shirt, value: "Apparel" },
    { key: "4", name: "Toys & Games", image: bear, value: "Toys_And_Games" },
    { key: "5", name: "Groceries", image: grocery, value: "Groceries" },
    { key: "6", name: "Mobiles", image: smartphone, value: "Mobiles" },
    { key: "7", name: "Sports", image: sport, value: "Sports" },
    {
      key: "8",
      name: "Office Supplies",
      image: office,
      value: "Office_Supplies",
    },
    { key: "9", name: "Accessories", image: accessories, value: "Accessories" },
    { key: "10", name: "Computers", image: computer, value: "Computers" },
    {
      key: "11",
      name: "Personal Care",
      image: personal_care,
      value: "Personal_Care",
    },
    { key: "12", name: "Bags", image: bags, value: "Bags" },
    { key: "13", name: "Cameras", image: camera, value: "Cameras" },
    { key: "14", name: "Shoes", image: shoes, value: "Shoes" },
    { key: "15", name: "Audio", image: audio, value: "Audio" },
    {
      key: "16",
      name: "Babies & Kids",
      image: baby_bottle,
      value: "Babies_And_Kids",
    },
  ];

  return (
    <>
      <Card padding={4} borderRadius="none">
        <Text fontWeight="semibold" fontSize="xl" color="gray.500">
          CATEGORIES
        </Text>
      </Card>
      <SimpleGrid columns={{ base: 8 }} mb="10px">
        {categories.map((c) => (
          <CategoryCard key={c.key} name={c.name} image={c.image} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default Category;
