import { useEffect, useState } from "react";
import { Heading, Box, Text, Grid, GridItem, Button } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import Cards from "./Cards";
import { useAuthContext } from "../context/AuthContext";


const ProductSection = () => {
  const { products } = useAuthContext();
  const [itemToShow, setItemToShow] = useState([]);
  console.log(products);



  function randomItemsHomePage(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  useEffect(()=>{
    const newArrayProducts = () => {
        const newItems = [];
        const numOfItems = 6;
        while(newItems.length < numOfItems) {
            const newRandomeItem=randomItemsHomePage(products)
            if(!newItems.includes(newRandomeItem)){
                newItems.push(newRandomeItem);
            }
             
        }
        console.log("this are the newitems", newItems);
        setItemToShow(newItems);
      };

      if(products.length>0){
        newArrayProducts();}


  },[products])
 



  return (
    <FullScreenSection pt={16} pb={16} width="100vw">
      <main>
        <Box
            backgroundColor="var(--color-white)"
          width="80vw"
          display="flex"
          flexDirection="column"
          alignItems="center"
          style={{ outline: "red dashed 4px" }}
          gap={16}
        >
          <Heading> Products</Heading>

          {itemToShow.length===0 ?<Box><Text fontSize='lg'>Loading.....</Text></Box> 
          : (<Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {itemToShow.map((item, index) => {
              return (
                <GridItem key={index} >
                  <Cards
                    key={index}
                    src={decodeURIComponent(item.item_image)}
                    product={item.item_name}
                    category={item.item_category}
                    quantity={item.item_quantity}
                  />
                </GridItem>
              );
            })}
          </Grid>)}
          <Button variant="link" colorScheme="teal"> See all products</Button>
        </Box>
      </main>
    </FullScreenSection>
  );
};

export default ProductSection;
