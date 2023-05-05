import { useAuthContext } from "../context/AuthContext";
import { Heading, Box, Text, Grid, GridItem, Button, HStack, ButtonGroup, Card } from "@chakra-ui/react";
import Cards from "../components/Cards"
import { useEffect, useState } from "react";

const ShowAll=()=>{
     const{ products }=useAuthContext()
     const [hygieneItems, setHygieneItems]=useState([])

     useEffect(()=>{
        const newArrayHigiene=()=>{
            const newHygiene=[];
            products.forEach(element => {
                console.log("loop",element.item_category)
                if(element.item_category==="Hygiene"){
                    newHygiene.push(element)
                }
                
            });
            console.log("new Hygiene ", newHygiene)
            setHygieneItems(newHygiene)
    
         }
         if(products.length>0){
            newArrayHigiene()
         }

     },[products])
    

     return(
        <Box>
      
        {hygieneItems.length===0 ?<Box><Text fontSize='lg'>Loading.....</Text></Box>
        :(
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {hygieneItems.map((item, index) => {
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
export default ShowAll