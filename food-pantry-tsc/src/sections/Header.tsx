import * as React from "react"
import { Box, BoxProps, Button, HStack, VStack } from "@chakra-ui/react"
import logonycnobg from "../images/nycdoenobg.png";
import { Link } from "react-router-dom";
import CartDrawer from "../components/CartDrawer";



const Header: React.FC=()=>{
    return (
        <Box 
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        maxWidth="100vw"
        width="100vw"
        backgroundColor="var(--color-white)"
        pt={8}
        pb={4}
        overflow="hidden"
        position="fixed"
        zIndex="1000"
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
        >
            <HStack px={16} gap="30rem">
                <nav>
                    <HStack>
                        <img src={logonycnobg} alt="logonycDOE" width="150px" />
                    </HStack>
                   
                </nav>
                <nav>
                    <HStack spacing={4} color="var(--color-dark)">
                        
                            <Button bg="transparent">Home</Button>
                            <Button bg="transparent">Products</Button>
                            <Button bg="transparent">About</Button>
                            <CartDrawer />
                        
                    </HStack>
                </nav>
            </HStack>
        </Box>

    )
}

export default Header;