import {
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../components/Input/TextInput";
import { Store } from "../../../entities/Store";
import useSave from "../../../hooks/useSave";
import { useAuthQueryStore } from "../../../store/auth-store";

const CreateStorePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setRole } = useAuthQueryStore();
  const {
    handleSubmit,
    loading,
    control,
    mutation: { mutate },
    setLoading,
    setError,
  } = useSave({ module: "store" });

  const onSubmit: SubmitHandler<Store> = (data: Store) => {
    setLoading(true);
    mutate(data, {
      onSuccess: () => {
        setRole("SELLER");
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        setLoading(false);
        navigate(`/seller`);
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

  const handleNavigateClick = () => {
    navigate(-1);
  };

  return (
    <>
      <IconButton
        icon={<IoMdArrowRoundBack size="25px" />}
        aria-label="Back"
        size="md"
        isRound
        onClick={handleNavigateClick}
        position="absolute"
        left="2"
        top="2"
      />
      <Center height="100vh">
        <Card width="400px">
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
                mb="10px"
                mt={4}
              >
                Create Store
              </Button>
            </form>
          </CardBody>
        </Card>
      </Center>
    </>
  );
};

export default CreateStorePage;
