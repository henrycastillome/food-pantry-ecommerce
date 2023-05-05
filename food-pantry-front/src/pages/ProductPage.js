import { useEffect, useState } from "react"
import Footer from "../components/Footer";
import FullScreenSection from "../components/FullScreenSection";
import Header from "../components/Header";
import { Heading, Box, Text, Grid, GridItem, Button, HStack, ButtonGroup, Card } from "@chakra-ui/react";
import { useAuthContext } from "../context/AuthContext";
import Cards from "../components/Cards";
import ShowAll from "../components/ShowAll"
import ShowHygiene from "../components/ShowHygiene"
import ShowFood from "../components/ShowFood";
import ShowHouseHold from "../components/ShowHouseHold";

const ProductDisplay=({showAllItems, showHygi, showFoods, showHouse})=>{
    if(showHygi){
        return <ShowHygiene />
    } else if(showAllItems){
        return <ShowAll />
    } else if(showFoods){
        return <ShowFood />
    } else if(showHouse){
        return <ShowHouseHold />
    }
    else {
        return <Box color="gray.500"> Please select a filter</Box>
    }
}

const ProductPage = () => {
 
    const [showAllItems, setShowAllItems]=useState(true)
    const [showHygi, setShowHygi]=useState(false)
    const [showFoods, setShowFoods]=useState(false)
    const [showHouse, setShowHouse]=useState(false)

    const showAllProducts=()=>{
        setShowHygi(false)
        setShowFoods(false)
        setShowHouse(false)
        setShowAllItems(!showAllItems)
       

    }
    const showAllHygiene=()=>{
         setShowAllItems(false)
            setShowFoods(false)
            setShowHouse(false)
        setShowHygi(!showHygi)
       
      
    }

    const showAllFood=()=>{
        setShowAllItems(false)
            setShowHygi(false)
            setShowHouse(false)
        setShowFoods(!showFoods)
       
    }

    const showHouseHoldItems=()=>{
        setShowAllItems(false)
            setShowHygi(false)
            setShowFoods(false)
        setShowHouse(!showHouse)
       
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
                    <Button isActive={showAllItems} onClick={showAllProducts}>All Products</Button>
                    <Button isActive={showHygi} onClick={showAllHygiene}> Hygiene</Button>
                    <Button isActive={showFoods} onClick={showAllFood}> Food</Button>
                    <Button isActive={showHouse} onClick={showHouseHoldItems}> Household Items</Button>
                </ButtonGroup>
            </HStack>
        </Box>
        
        
       <ProductDisplay showAllItems={showAllItems} showHygi={showHygi} showFoods={showFoods} showHouse={showHouse} /> 
        
       


    </FullScreenSection>
    <Footer />
    </>
  );
};

export default ProductPage;
