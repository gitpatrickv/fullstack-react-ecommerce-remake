import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  FormControl,
  IconButton,
  Image,
  Select,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import TextInput from "../../../components/Input/TextInput";
import Variation from "./component/Variation";
import useSaveProduct from "./hooks/useSaveProduct";
const CreateProductPage = () => {
  const {
    loading,
    onSubmit,
    register,
    handleSubmit,
    imageFile,
    setImageFile,
    setValue,
    setImagePreview,
    imagePreview,
    control,
  } = useSaveProduct();

  const categories = [
    { name: "Motors", value: "Motors" },
    { name: "Home Appliances", value: "Home_Appliances" },
    { name: "Apparel", value: "Apparel" },
    { name: "Toys & Games", value: "Toys_And_Games" },
    { name: "Groceries", value: "Groceries" },
    { name: "Mobiles", value: "Mobiles" },
    { name: "Sports", value: "Sports" },
    { name: "Office Supplies", value: "Office_Supplies" },
    { name: "Accessories", value: "Accessories" },
    { name: "Computers", value: "Computers" },
    { name: "Personal Care", value: "Personal_Care" },
    { name: "Bags", value: "Bags" },
    { name: "Cameras", value: "Cameras" },
    { name: "Shoes", value: "Shoes" },
    { name: "Audio", value: "Audio" },
    { name: "Babies & Kids", value: "Babies_And_Kids" },
  ];

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (files: FileList | null) => {
    if (files && files.length > 0 && files.length <= 8) {
      setImageFile(files);
      setValue("file", files);
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreview(imageUrls);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileInput(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileInput(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!imagePreview) return;
    return () => {
      imagePreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreview]);

  return (
    <Card padding={5}>
      <Text fontSize="lg" fontWeight="semibold">
        Create new product
      </Text>
      <Divider color="gray.500" />
      <Box padding={5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            control={control}
            name="productName"
            loading={loading}
            placeholder="Product Name"
            label="Product Name"
          />
          <TextInput
            control={control}
            name="description"
            loading={loading}
            placeholder="Description"
            label="Description"
            mt="10px"
          />

          <FormControl isRequired mb="10px" mt="10px">
            <Select id="categories" {...register("category")}>
              <option value="" hidden>
                Category
              </option>
              {categories.map((category) => (
                <option key={category.name} value={category.value}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <Variation register={register} control={control} />
          <Text fontSize="xs" color="gray.500" mb="5px" fontWeight="semibold">
            Photos {imageFile?.length || 0} / 8 - You can add up to 8 photos.
          </Text>
          <Flex gap={1} mt="10px">
            {imagePreview && (
              <>
                {imagePreview?.slice(0, 8).map((image, index) => (
                  <Box key={index} cursor="pointer">
                    <Image
                      src={image}
                      key={index}
                      width="150px"
                      height="150px"
                      borderRadius="10px"
                    />
                  </Box>
                ))}
              </>
            )}

            <Flex
              width="150px"
              height="150px"
              border="1px solid"
              justifyContent="center"
              alignItems="center"
              borderRadius="10px"
              mb="10px"
              onClick={handleInputClick}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              cursor="pointer"
              borderColor="gray.200"
            >
              <Box textAlign="center" width="100%">
                <IconButton
                  aria-label="image"
                  icon={<MdOutlineAddPhotoAlternate size="25px" />}
                  isRound
                  height="42px"
                  width="42px"
                />
                <Text fontWeight="semibold" mt="5px">
                  Add Photos
                </Text>
                <Text color="gray.500">or drag and drop</Text>
              </Box>
            </Flex>

            <input
              type="file"
              accept=".jpeg, .png"
              multiple
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Flex>
          <Button
            type="submit"
            mt="20px"
            bg="#FF5722"
            _hover={{ bg: "#E64A19" }}
            width="100%"
          >
            Save Product
          </Button>
        </form>
      </Box>
    </Card>
  );
};

export default CreateProductPage;
