import { Heading, Box, Text } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import Cards from "./Cards"
import { useAuthContext } from "../context/AuthContext";

const ProductSection = () => {
    const { products }=useAuthContext()
    console.log(products)
  return (
    <FullScreenSection pt={16} width="100vw">
      <main>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          style={{ outline: "red dashed 4px" }}
        >
          <Heading> Products</Heading>
          {products.map((item, index)=>{
            return(
            <Cards
                key={index}
                src={decodeURIComponent(item.item_image)}
                product={item.item_name}
                category={item.item_category}
                quantity={item.item_quantity}

                />
          )
          })}
          
        </Box>
      </main>
    </FullScreenSection>
  );
};

export default ProductSection;
