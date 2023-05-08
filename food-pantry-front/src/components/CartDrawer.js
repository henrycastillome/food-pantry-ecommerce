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
  HStack,
  Spinner
} from "@chakra-ui/react";
import {  useRef, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNewOrderContext } from "../context/NewOrder";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const {customer}=useAuthContext()
  const { cartItemCount, newOrderItem, setNewOrderItem } = useNewOrderContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading]=useState(false)

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

 let customerSubmit= useMemo(()=>{
    return {user_id:Number(customer?.user_id)}
 },[customer])

 const orderSubmit = useMemo(() => {
  return {
    ...customerSubmit,
    items: countArray.map(item => ({
      item_id: Number(item.id),
      quantity: Number(item.total),
    })),
  };
}, [customerSubmit, countArray]);

  







 console.log("order submit", JSON.stringify(orderSubmit))

 const handleSubmit=async()=>{

  if(customer){
    setIsLoading(true)

  try{
  const body=JSON.stringify(orderSubmit)
  const response= await axios.post("https://food-pantry.herokuapp.com/orders.php", body)
  console.log(response.data)

  const status= response.data['status']
  const message=response.data['message']

  if(status===1){
    toast.success(
      "Your order has been submitted"
    )
    setTimeout(()=>{
      navigate("/")
    }, 5000)
    localStorage.removeItem('cart')
    setNewOrderItem([])
  } else {
    toast.error('error server-->', message)
  }

 } catch(error){
  toast.error("something went wrong, try again later")
 }
} else{
  toast.info("you need to log in first")
}
setIsLoading(false)
 }

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
     

      <Drawer size='sm' isOpen={isOpen} placement="right" onClose={onClose}>
      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
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
          <DrawerFooter alignContent='center' justifyContent='center'>
            {isLoading ? <Spinner /> :(
              <>
            <Button colorScheme="teal" variant="outline" mr={3} onClick={emptyCart}> Empty Cart</Button>

            <Button onClick={handleSubmit} colorScheme="teal"> Submit Order</Button>
            </>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
