import { useAuthContext } from "../context/AuthContext";
import {  Box, Text, Grid, GridItem} from "@chakra-ui/react";
import Cards from "../components/Cards"
import { useNewOrderContext } from "../context/NewOrder";

const ShowAll=()=>{
     const{ products }=useAuthContext()
     const {
  
        addingItems,
        handleAddToCart,
    
      
      } = useNewOrderContext();

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
                            button2={addingItems[index] ? "Adding" : "Add to cart"}
                            onClick={() => handleAddToCart(item, index)}


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