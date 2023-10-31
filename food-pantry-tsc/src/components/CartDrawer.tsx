import { Box, Button, Card,CardBody,Stack, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Heading, useDisclosure,StackDivider, Text, DrawerFooter, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useCartContext } from '../context/CartContext';
import { userOrderData } from '../hooks/useOrderData';
import { toast } from 'react-toastify';
import { useCustomerContext } from '../context/CustomerContext';



const CartDrawer = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {customer}=useCustomerContext()
    const navigate=useNavigate()
    const {cart, setCart, totalQuantity}=useCartContext()
    const [isLoading, setIsLoading]=useState(false)
    const btnRef = React.useRef<HTMLButtonElement | null>(null)

    const emptyCart=()=>{
        localStorage.removeItem("cart")
        setCart([])
    }

    const handleSubmitOrder=async()=>{
        if(customer){
            setIsLoading(true)
        

        try{
            const body=userOrderData(customer, cart)
            const response=await axios.post("http://localhost/my_php/food-pantry-ecommerce/api/ordersSubmit.php", body)
            console.log(response.data)

            const status=response.data['status']
            const message=response.data['message']

            if(status===1){
                toast.success("Your order has been submitted")
            
            setTimeout(()=>{
                navigate("/")
            }, 5000)
            localStorage.removeItem('cart')
            setCart([])
        } else{
            toast.error("error server -->",message)
        }
        } catch(error){
            toast.error('something went wrong, try again later')
        }
    }

        else{
            toast.info("Please login to submit your order")
        }

        setIsLoading(false)
    }
    

    return (
        <>
        <Button 
            onClick={onOpen}
            ref={btnRef}
            backgroundColor='transparent'
            style={{position:"relative"}}
            >
                <FontAwesomeIcon
                    color="var(--color-teal)"
                    size="lg"
                    icon={faCartShopping}
                    />
                
            </Button>

            <Drawer size='sm' isOpen={isOpen} placement='right' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Cart</DrawerHeader>
                    <DrawerBody>
                        <Card>
                            <CardBody>
                                <Stack divider={<StackDivider />} spacing={4}>
                                    {cart.map((item, index)=>{
                                        return(
                                            <Box key={index}>
                                                <HStack>
                                                    <Box><Heading size='xs' textTransform='uppercase'>
                                                        {item.name}
                                                        
                                                        </Heading></Box>
                                                    <Box>
                                                        <Text fontSize='sm'>-----------X {item.quantity}
                                                    </Text>
                                                    </Box>
                                                </HStack>
                                                <Text pt="2" fontSize="sm">
                                                    {item.category}
                                                </Text>
                                               
                                            </Box>
                                            
                                            
                                        )})}
                                </Stack>
                            </CardBody>
                        </Card>
                    </DrawerBody>
                    <DrawerFooter alignContent='center' justifyContent='center'>
                        {isLoading ? <Spinner /> :(
                            <>
                            <Button colorScheme='teal' variant='outline' mr={3} onClick={emptyCart}>
                                Empty Cart
                            </Button>
                            <Button
                                onClick={handleSubmitOrder}
                                colorScheme="teal"
                            
                                >
                                    Submit Order
                            </Button>
                            
                            </>
                            
                        )}

                    </DrawerFooter>
                </DrawerContent>
            </Drawer> 
            
        </>
    )
}

export default CartDrawer