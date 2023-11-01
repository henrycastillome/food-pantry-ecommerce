import { useState } from "react";
import { Box,  Button, HStack, Spinner, Text } from "@chakra-ui/react"
import logonycnobg from "../images/nycdoenobg.png";
import { Link } from "react-router-dom";
import CartDrawer from "../components/CartDrawer";
import { useCustomerContext } from "../context/CustomerContext";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";



const Header=()=>{
    const {customer, setCustomer,isValidCustomer, setIsValidCustomer}=useCustomerContext()
    const {isAuthenticated}=useUserContext()
    const navigate=useNavigate()
    const [isLoading, setIsLoading]=useState<boolean>(false)
    const handleLogout=()=>{
        sessionStorage.removeItem("customer")
        setIsLoading(true)

        setTimeout(()=>{
            setCustomer(null)
            setIsValidCustomer(false)
        }, 3000)
    

    setTimeout(()=>{
        setIsLoading(false)
        navigate('/')
    }   , 5000  )
    }

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

                           {isValidCustomer ? (
                                <>
                                <Text>
                                    Loggaed in as <b>{customer?.user_name}</b>
                                </Text>
                                {isLoading ? <Spinner /> :(
                                    <Button onClick={handleLogout} fontSize='sm' bg='transparent'>
                                        <Text as='u'>(Logout)</Text></Button>
                                )}
                                </>
                           ):(
                            <>
                            <Link to="/registration">
                                <Button variant='solid' colorScheme="teal">
                                    Sign Up
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button variant='outline' colorScheme="teal">
                                    Login
                                </Button>
                            </Link>
                            <Link to={isAuthenticated ? "/admin" : "/inventory"}>
                                <Button fontSize='sm' as='u' variant='link' colorScheme="teal">
                                    {isAuthenticated ?   "Inventory" : "Admin"} 
                                </Button>
                            </Link>
                            </>
                           )}

                        
                    </HStack>
                </nav>
            </HStack>
        </Box>

    )
}

export default Header;