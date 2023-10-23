import { Box, Heading } from "@chakra-ui/react"
import FullScreenSection from "../utils/FullScreenSection"
import { useEffect, useState } from "react"
import axios from "axios";
import ProductsApi from "../utils/Products";

interface Item{
    item_id:number;
    item_name:string;
    item_category:string;
    item_quantity:number;
    item_image:string;


}

const ProductSection:React.FC<{}> =()=>{

    const [products, setProducts]=useState<Item[]>([])

    useEffect(() => {
        // Fetch products when the component mounts
       const fetchData= async()=>{
        try{
            const api=new ProductsApi("http://localhost/my_php/food-pantry-ecommerce/api/inventory.php")
            const data=await api.getAll()
            console.log(data)
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
                          {products.map((product)=>(
                            <div key={product.item_name}>
                                <p>{product.item_name}</p>
                            </div>
                          ))}
                    </Box>
                </main>

        </FullScreenSection>
    )
}

export default ProductSection