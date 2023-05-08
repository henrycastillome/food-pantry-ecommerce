import { Box, Button, HStack, Spinner, Text } from "@chakra-ui/react";
import logonycnobg from "../images/nycdoenobg.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import CartDrawer from "./CartDrawer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = ({ isHomePage }) => {
  const { handleClick, customer, isCustomerValid, setCustomer,setIsCustomerValid, isAuthenticated } = useAuthContext();
  const [isLoading, setIsLoading]=useState(false)
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('customer'); 
    setIsLoading(true)
    setTimeout(()=>{
      setCustomer(null)
      setIsCustomerValid(false)
     
    }, 3000)
    
    
    setTimeout(()=>{
      setIsLoading(false)
      navigate('/')
    },5000)
    
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
            <img src={logonycnobg} alt="logonycdoe" width="150px" />
          </HStack>
        </nav>
        <nav>
          <HStack spacing={4} color="var(--color-dark)">
            <Link to="/">
              <Button bg="transparent">Home</Button>
              
            </Link>
            {isHomePage ? (
              <Button onClick={handleClick("product")} bg="transparent">
                Products
              </Button>
            ) : (
              <Link to="/products">
                <Button bg="transparent">Products</Button>
                
              </Link>
              
            )}

            <Link to="/about">
              <Button bg="transparent">About</Button>
            </Link>
            <CartDrawer />
            {isCustomerValid ? (
              <>
              <Text fontSize="sm"  color="var(--color-dark)">
                {" "}
                Logged in as <b>{customer?.user_name} </b>{" "}
              </Text>
              { isLoading? (<Spinner />) :
              (
              <Button onClick={handleLogout} fontSize="sm"  bg="transparent">
                <Text as="u">(Logout)</Text>
              </Button>
              )}
              </>
            ) : (
              <>
                <Link to="/registration">
                  <Button variant="solid" colorScheme="teal">
                    Sign up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" colorScheme="teal">
                    {" "}
                    Login
                  </Button>
                </Link>
                <Link to={isAuthenticated ? "/admin" : "/inventory"}>
                <Button fontSize="sm" as="u" variant="link" colorScheme="teal">
                  {" "}
                  Admin
                </Button>
                </Link>
              </>
            )}
          </HStack>
        </nav>
      </HStack>
    </Box>
  );
};
export default Header;
