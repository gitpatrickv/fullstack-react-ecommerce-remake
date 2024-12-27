import {
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import TextInput from "../../../components/Input/TextInput";
import useSave from "../../../hooks/useSave";
import { Store } from "../../../entities/Store";
import { useNavigate } from "react-router-dom";
const CreateStorePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    loading,
    // onSubmit,
    control,
    mutation: { mutate },
    setLoading,
    setError,
  } = useSave({ module: "store" });

  const onSubmit: SubmitHandler<Store> = (data: any) => {
    setLoading(true);
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        setLoading(false);
        navigate("/seller");
      },
      onError: (error: any) => {
        setLoading(false);

        if (error.response?.data.storeName) {
          setError("storeName", {
            type: "server",
            message: error.response.data.storeName,
          });
        }
        if (error.response?.data.contactNumber) {
          setError("contactNumber", {
            type: "server",
            message: error.response.data.contactNumber,
          });
        }
      },
    });
  };

  return (
    <Center justifyContent="center" alignItems="center" height="100vh">
      <Card width="500px">
        <CardBody>
          <Text textAlign="center" fontWeight="semibold" fontSize="xl">
            Create Store
          </Text>
          <Divider mb="15px" mt="15px" />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(onSubmit)(event);
            }}
          >
            <TextInput
              control={control}
              name="storeName"
              loading={loading}
              placeholder="Store Name"
              label="Store Name"
            />
            <TextInput
              control={control}
              name="contactNumber"
              loading={loading}
              placeholder="Contact Number"
              label="Contact Number"
              mt={4}
            />
            <Button
              isLoading={loading}
              type="submit"
              width="100%"
              bg="orange.500"
              _hover={{ bg: "orange.600" }}
              mb="20px"
              mt={4}
            >
              Create Store
            </Button>
          </form>
        </CardBody>
      </Card>
    </Center>
  );
};

export default CreateStorePage;
