import Header from "../sections/Header";
import React, { useState, useEffect } from "react";
import { Box, Heading, HStack,Button,ButtonGroup, Grid, GridItem } from "@chakra-ui/react";
import FullScreenSection from "../components/FullScreenSection";
import { Item } from "../types/ItemTypes";
import { useCartContext } from "../context/CartContext";
import ProductsApi from "../api/ProductsApi";
import Cards from "../components/Cards";
import { InvalidResponseStructureError } from "../errors/Errors";

// working in the products and filter
const ProductPage:React.FC<{}> = () => {

    const [productsPage, setProductsPage] = useState<Item[]>([]);
    const [category, setCategory] = useState<Item[]>([]);
    const { handleAddToCartClick } = useCartContext();
    const [isActive, setIsActive]=React.useState<boolean>(false)
    const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);


    const fetchAllProducts = async () => {
        
        try {
            const fetchProducts = new ProductsApi("http://localhost/my_php/food-pantry-ecommerce/api/getAllAll.php");
            const response = await fetchProducts.getAll();
            setProductsPage(response.products);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchCategoryProducts = async () => {
        try {
            const fetchCategory = new ProductsApi("http://localhost/my_php/food-pantry-ecommerce/api/getCategories.php");
            const response = await fetchCategory.getAll();
            response.products.push({item_category:"All"})
            setCategory(response.products);
        } catch (error) {
            console.error(error);
        }
    }

    const productByCategory = async (value:string) => {
        setIsActive(false)
        try {
            const fetchProducts = new ProductsApi(`http://localhost/my_php/food-pantry-ecommerce/api/get${value}All.php`);
            const response = await fetchProducts.getAll();
            if(response.products.length===0){
                setProductsPage([]) }
            else{
            setProductsPage(response.products)
            setActiveCategoryIndex(0)
            };
        } catch (error) {
            setProductsPage([])
            console.log(error)
           
        }
    }

    useEffect(()=>{
        fetchCategoryProducts()
        fetchAllProducts()
    },[])

    console.log(productsPage)
    console.log(category)

   
  return (
    <main>
      <>
        <Header />
        <Box pt={32}>
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
        </Box>

        <FullScreenSection
        pt={16}
        pb={16}
        width="100vw"
        backgroundColor="var(--color-white)"
      >
        <Box pb={8}>
          <HStack spacing={4}>
            <Heading fontSize="lg"> Filter by: </Heading>
            <ButtonGroup variant="outline" colorScheme="teal" spacing={4}>

             {category.length===0 ?(
                    <Box>No Categories to show...</Box>
                ):(
                    category.map((category,index)=>{
                        return(
                            <Button key={index}  onClick={category.item_category === "All"? ()=> fetchAllProducts() : ()=>productByCategory(category.item_category)} >
                                {category.item_category} 
                            </Button>
                        )
                    }
                    
                ))
             }
              
            </ButtonGroup>
          </HStack>
        </Box>

        <Box
          width="80vw"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={16}>

            {productsPage.length===0 ?(
                <Box>Loading...</Box>
            ) :(
                <Grid templateColumns="repeat(3,1fr)" gap={6}>
                    {productsPage.map((product,index)=>{
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



      </FullScreenSection>
      </>
    </main>
  );
};

export default ProductPage;
