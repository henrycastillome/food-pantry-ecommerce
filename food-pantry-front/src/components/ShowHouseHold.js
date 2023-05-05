import { useAuthContext } from "../context/AuthContext";
import { Heading, Box, Text, Grid, GridItem, Button, HStack, ButtonGroup, Card } from "@chakra-ui/react";
import Cards from "../components/Cards"
import { useEffect, useState } from "react";

const ShowHouseHold=()=>{
     const{ products }=useAuthContext()
     const [hhItems, setHhItems]=useState([])

     useEffect(()=>{
        const newArrayHhItems=()=>{
            const newHhItems=[];
            products.forEach(element => {
                console.log("loop",element.item_category)
                if(element.item_category==="Household items"){
                    newHhItems.push(element)
                }
                
            });
            
            setHhItems(newHhItems)
    
         }
         if(products.length>0){
            newArrayHhItems()
         }

     },[products])
    

     return(
        <Box>
      
        {hhItems.length===0 ?<Box><Text fontSize='lg'>Loading.....</Text></Box>
        :(
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {hhItems.map((item, index) => {
                    return (
                    <GridItem key={index}>
                        <Cards 
                            key={index}
                            src={decodeURIComponent(item.item_image)}
                             product={item.item_name}
                            category={item.item_category}
                        quantity={item.item_quantity}


                        />
                    </GridItem>
                    )
                })}
            </Grid>
             )}
        
        </Box>

     )

}
export default ShowHouseHold