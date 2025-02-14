import {
  Card,
  CardBody,
  Center,
  Divider,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import OrangeButton from "../../../components/Button/OrangeButton";
import TextInput from "../../../components/Input/TextInput";
import { Store } from "../../../entities/Store";
import useSaveResource from "../../../hooks/useSaveResource";
import { useAuthQueryStore } from "../../../store/auth-store";

const CreateStorePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setRole } = useAuthQueryStore();
  const { handleSubmit, setError, control } = useForm<Store>();
  const {
    loading,
    mutation: { mutate },
    setLoading,
  } = useSaveResource<Store>({ module: "store" });

  const onSubmit: SubmitHandler<Store> = (data: Store) => {
    setLoading(true);
    mutate(data, {
      onSuccess: () => {
        setRole("SELLER");
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        queryClient.invalidateQueries({
          queryKey: ["store"],
        });
        setLoading(false);
        setTimeout(() => {
          navigate(`/seller`);
        }, 200);
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
      <Center height="90vh">
        <Card width="450px" borderRadius="none">
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
              />
              <TextInput
                control={control}
                name="contactNumber"
                loading={loading}
                placeholder="Contact Number"
                mt={4}
              />
              <OrangeButton type="submit" width="100%" mt="10px">
                Create Store
              </OrangeButton>
            </form>
          </CardBody>
        </Card>
      </Center>
    </>
  );
};

export default CreateStorePage;
