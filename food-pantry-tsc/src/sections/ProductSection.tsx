import { Box, Grid, Heading, GridItem } from "@chakra-ui/react"
import FullScreenSection from "../components/FullScreenSection"
import { useEffect, useState } from "react"
import ProductsApi from "../api/ProductsApi";
import Cards from "../components/Cards";
import { handleAddToCart } from "../utils/cartUtils";
import { CartItem } from "../types/CartTypes";
import { Item } from "../types/ItemTypes";
import { useCartContext } from "../context/CartContext";




const ProductSection:React.FC<{}> =()=>{

    const [products, setProducts]=useState<Item[]>([])
    const {cart, handleAddToCartClick}=useCartContext()


    useEffect(() => {
        // Fetch products when the component mounts
       const fetchData= async()=>{
        try{
            const fetchProducts=new ProductsApi("http://localhost/my_php/food-pantry-ecommerce/api/getRandomProducts.php")
            const data=await fetchProducts.getAll()
            setProducts(data.products)
        }   catch(error){
            console.error(error)
        }
       };
       fetchData()
      }, []);


   
  
 
    return(
        <FullScreenSection
            pt={16}
            pb={16}
            width="100vw"
            backgroundColor="var(--color-white)">

                <main>
                    <Box
                        width="80vw"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={16}
                        >
                            <Heading id="product-section">Products</Heading>
                         {products.length===0 ?(
                                <Box>Loading...</Box>
                         ):(
                            <Grid templateColumns="repeat(3,1fr)" gap={6}>
                                {products.map((product,index)=>{
                                    return(
                                        <GridItem key={index}>
                                            <Cards
                                                key={product.item_id}
                                                src={decodeURIComponent(product.item_image)}
                                                product={product.item_name}
                                                category={product.item_category}
                                                quantity={product.item_quantity}
                                                button2="Add to Cart"
                                                onClick={()=>handleAddToCartClick(product)}

                                                
                                                />
                                        </GridItem>
                                    )
                                })}
                            </Grid>
                         )}
                    </Box>
                </main>

        </FullScreenSection>
    )
}

export default ProductSection