import * as React from "react"
import { BoxProps, VStack } from "@chakra-ui/react"

interface FullScreenSectionProps extends BoxProps{

    children:React.ReactNode;
    boxProps?:BoxProps //question mark is to define that is optional  and define an empty object

}

const FullScreenSection=({children,  boxProps={} }: FullScreenSectionProps)=>{
    return(
        <VStack backgroundColor={boxProps.backgroundColor}
            alignItems='start'
            justifyContent='flex-start'
            >
                <VStack maxWidth="100vw" {...boxProps}>
                    {children}
                </VStack>
            </VStack> 
    )
}

export default FullScreenSection