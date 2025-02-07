import {
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import OrangeButton from "../../../../components/Button/OrangeButton";
import WhiteButton from "../../../../components/Button/WhiteButton";
import useReplyToReview, {
  ReplyToReviewProps,
} from "../hooks/useReplyToReview";

interface Props {
  productReviewId: number;
  sellerResponse?: string;
}

const ReplyToReviewModal = ({ productReviewId, sellerResponse }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: replyToReview } = useReplyToReview();
  const { handleSubmit, setValue, reset } = useForm<ReplyToReviewProps>();

  const inputRef = (element: HTMLTextAreaElement | null) => {
    if (element) {
      element.focus();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue("reply", e.target.value);
  };

  const onSubmit: SubmitHandler<ReplyToReviewProps> = (
    data: ReplyToReviewProps
  ) => {
    const requestData = {
      ...data,
      productReviewId: productReviewId,
    };
    replyToReview(requestData, {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
  };

  return (
    <>
      <OrangeButton width="150px" onClick={onOpen}>
        {sellerResponse ? "Edit" : "Reply"}
      </OrangeButton>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(onSubmit)(event);
          }}
        >
          <ModalContent borderRadius="none">
            <ModalHeader>Reply</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <Textarea
                  onChange={handleInputChange}
                  placeholder="Enter your response."
                  borderRadius="none"
                  ref={inputRef}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <WhiteButton mr="10px" onClick={onClose}>
                Cancel
              </WhiteButton>
              <OrangeButton type="submit" width="130px">
                Submit
              </OrangeButton>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default ReplyToReviewModal;
