import { useEffect, useState } from "react"
import Footer from "../components/Footer";
import FullScreenSection from "../components/FullScreenSection";
import Header from "../components/Header";
import { Heading, Box, Text, Grid, GridItem, Button, HStack, ButtonGroup, Card } from "@chakra-ui/react";
import { useAuthContext } from "../context/AuthContext";
import Cards from "../components/Cards";
import ShowAll from "../components/ShowAll"
import ShowHygiene from "../components/ShowHygiene"

const ProductPage = () => {
 
    const [showAllItems, setShowAllItems]=useState(true)
    const [showHygi, setShowHygi]=useState(false)

    const showAllProducts=()=>{
        setShowAllItems(!showAllItems)

    }
    const showAllHygiene=()=>{
        setShowHygi(!showHygi)
        if(!showHygi){
            setShowAllItems(true)
        }
    }


  return (
    <>
    <FullScreenSection>
      <Header />
      <Box className="productPage">
        <Box className="overlay">
          <Box
            width="50%"
            py={16}
            gap={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            bg="rgba(50, 75, 74, 0.85)"
          >
            <Heading as="h1" fontSize="6xl">
              Products
            </Heading>
          </Box>
        </Box>
      </Box>
    </FullScreenSection>
        
    <FullScreenSection pt={16} pb={16} width="100vw" backgroundColor='var(--color-white)'>
        <Box pb={8}>
            
            <HStack spacing={4}>
            <Heading fontSize='lg'> Filter by: </Heading>
                <ButtonGroup variant='outline' colorScheme="teal" spacing={4}> 
                    <Button  onClick={showAllProducts}>All Products</Button>
                    <Button onClick={showAllHygiene}> Hygiene</Button>
                    <Button> Food</Button>
                    <Button> Household Items</Button>
                </ButtonGroup>
            </HStack>
        </Box>
        
        {showAllItems && <ShowAll />}
        {showHygi && <ShowHygiene />}
        
       


    </FullScreenSection>
    <Footer />
    </>
  );
};

export default ProductPage;
