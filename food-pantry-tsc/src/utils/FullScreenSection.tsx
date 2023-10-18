import * as React from "react"
import { VStack } from "@chakra-ui/react"

interface FullScreenSectionProps {

    children:React.ReactNode;
    backgroundColor?:string;
    alignItems?:string
    justifyContent?:string 
    width?:string
    height?:string
    pt?:number//question mark is to define that is optional  and define an empty object
    pb?:number
    color?:string
}

const FullScreenSection:React.FC<FullScreenSectionProps>=({children, ...boxProps}: FullScreenSectionProps)=>{
    return(
        <VStack backgroundColor={boxProps.backgroundColor}
            alignItems={boxProps.alignItems}
            justifyContent={boxProps.justifyContent}
            width={boxProps.width}
            height={boxProps.height}
            pt={boxProps.pt}
            pb={boxProps.pb}
            color={boxProps.color}
            >
                <VStack maxWidth="100vw" {...boxProps}>
                    {children}
                </VStack>
            </VStack> 
    )
}

export default FullScreenSection