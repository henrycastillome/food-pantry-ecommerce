import { useAuthContext } from "../context/AuthContext";
import { Heading, Box, Text, Grid, GridItem, Button, HStack, ButtonGroup, Card } from "@chakra-ui/react";
import Cards from "../components/Cards"

const ShowAll=()=>{
     const{ products }=useAuthContext()

     return(
        <Box>
      
        {products.length===0 ?<Box><Text fontSize='lg'>Loading.....</Text></Box>
        :(
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {products.map((item, index) => {
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