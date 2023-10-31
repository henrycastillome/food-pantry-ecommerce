import { Box, Button, Card,CardBody,Stack, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Heading, useDisclosure,StackDivider, Text } from '@chakra-ui/react';
import { relative } from 'path';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useCartContext } from '../context/CartContext';



const CartDrawer = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {cart, totalQuantity}=useCartContext()
    const btnRef = React.useRef<HTMLButtonElement | null>(null)

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
                </DrawerContent>
            </Drawer> 
            
        </>
    )
}

export default CartDrawer