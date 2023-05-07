import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Heading,
  Text,
  HStack
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNewOrderContext } from "../context/NewOrder";
import { useAuthContext } from "../context/AuthContext";

const CartDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const {customer}=useAuthContext()
  const { cartItemCount, newOrderItem, setNewOrderItem } = useNewOrderContext();

 const newCart=Array.from(new Set(newOrderItem));
 const countArray= newCart.map(item=>{
    return{
        id:item.item_id,
        name:item.item_name,
        category: item.item_category,
        total: newOrderItem.filter(count=>count===item).length
    }
 })

 const emptyCart=()=>{
    localStorage.removeItem('cart')
    setNewOrderItem([])
 }

 const orderSubmit=countArray.map(item=>{
  return{
    items:{
    id:item.id,
    quantity:item.total,
    }
  }
 })

 orderSubmit.unshift("user_id",customer.user_id)

 orderSubmit["user_id"]=customer.user_id

 console.log("order submit", JSON.stringify(orderSubmit))

//  const handleSubmit=()=>{
//   const body=JSON.stringify(countArray)
//   const response= axios.post("http://localhost/my_php/food-pantry-ecommerce/api/orders.php")
//  }

  return (
    <>
      <Button
        onClick={onOpen}
        ref={btnRef}
        backgroundColor='transparent'
        style={{ position: "relative" }}
      >
        <FontAwesomeIcon
          color="var(--color-teal)"
          size="lg"
          icon={faCartShopping}
        />
        {cartItemCount > 0 && (
          <span className="cart-count">{cartItemCount}</span>
        )}
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart</DrawerHeader>
          <DrawerBody>
            <Card>
              <CardBody>
                <Stack divider={<StackDivider />} spacing={4}>
                  {countArray.map((item, index) => {
                    return (
                      <Box key={index}>
                        <HStack>
                            <Box><Heading size="xs" textTransform="uppercase">
                          {" "}
                          {item.name}
                        </Heading></Box>
                        <Box>
                        <Text fontSize="sm">
                          {" "}
                          -------------- X {item.total}
                        </Text>
                        </Box>
                        </HStack>
                        
                        <Text pt="2" fontSize="sm">
                          {" "}
                          {item.category}
                        </Text>
                      </Box>
                    );
                  })}
                </Stack>
              </CardBody>
            </Card>
          </DrawerBody>
          <DrawerFooter >
            <Button colorScheme="teal" variant="outline" mr={3} onClick={emptyCart}> Empty Cart</Button>

            <Button colorScheme="teal"> Submit Order</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
