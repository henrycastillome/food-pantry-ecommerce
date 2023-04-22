import * as React from "react";
import { VStack } from "@chakra-ui/react";

const FullScreenSection = ({ children, isDarkBackground, ...boxProps }) => {
  return (
    <VStack
      backgroundColor={boxProps.backgroundColor}
     
      alignItems="start"
      justifyContent="flex-start"
    >
      <VStack maxWidth="100vw" {...boxProps}>
        {children}
      </VStack>
    </VStack>
  );
};

export default FullScreenSection;
