import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface ModalProviderProps {
  children: ReactNode;
}

type ModalContextData = UseDisclosureReturn;

const ModalContext = createContext({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps) {
  const disclosure = useDisclosure();

  useEffect(() => {
    disclosure.onClose();
  }, []);

  return (
    <ModalContext.Provider value={disclosure}>{children}</ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
