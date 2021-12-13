import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface VideoModalProviderProps {
  children: ReactNode;
}

type VideoModalContextData = UseDisclosureReturn;

const VideoModalContext = createContext({} as VideoModalContextData);

export function VideoModalProvider({ children }: VideoModalProviderProps) {
  const disclosure = useDisclosure();

  useEffect(() => {
    disclosure.onClose();
  }, []);

  return (
    <VideoModalContext.Provider value={disclosure}>
      {children}
    </VideoModalContext.Provider>
  );
}

export const useVideoModal = () => useContext(VideoModalContext);
