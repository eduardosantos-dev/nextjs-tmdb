import {
  AspectRatio,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useModal } from "../../context/ModalContext";

interface VideoModalProps {
  contentTitle: string;
  src: string;
}

export default function VideoModal({ contentTitle, src }: VideoModalProps) {
  const { isOpen, onClose } = useModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent
        bgColor="black"
        overflow="hidden"
        minW={{ base: "100%", xl: "container.xl" }}>
        <ModalHeader>{contentTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <AspectRatio ratio={16 / 9}>
            <iframe title={contentTitle} src={src} allowFullScreen />
          </AspectRatio>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
