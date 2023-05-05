import { useAuthContext } from "../context/AuthContext";
import { Heading, Box, Text, Grid, GridItem, Button, HStack, ButtonGroup, Card } from "@chakra-ui/react";
import Cards from "../components/Cards"
import { useEffect, useState } from "react";

const ShowFood=()=>{
     const{ products }=useAuthContext()
     const [foodItems, setFoodItems]=useState([])

     useEffect(()=>{
        const newArrayFood=()=>{
            const newFood=[];
            products.forEach(element => {
                
                if(element.item_category==="food"){
                    newFood.push(element)
                }
                
            });
            console.log("new Food ", newFood)
            setFoodItems(newFood)
    
         }
         if(products.length>0){
            newArrayFood()
         }

     },[products])
    

     return(
        <Box>
      
        {foodItems.length===0 ?<Box><Text fontSize='lg'>Loading.....</Text></Box>
        :(
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {foodItems.map((item, index) => {
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
export default ShowFood