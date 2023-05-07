import { useEffect, useState } from "react";
import { Heading, Box, Text, Grid, GridItem, Button } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import Cards from "./Cards";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNewOrderContext } from "../context/NewOrder";

const ProductSection = () => {
  const { products } = useAuthContext();
  const [itemToShow, setItemToShow] = useState([]);

  const {
  
    addingItems,
    handleAddToCart,
   
  
  } = useNewOrderContext();

  function randomItemsHomePage(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  useEffect(() => {
    const newArrayProducts = () => {
      const newItems = [];
      const numOfItems = 6;
      while (newItems.length < numOfItems) {
        const newRandomeItem = randomItemsHomePage(products);
        if (!newItems.includes(newRandomeItem)) {
          newItems.push(newRandomeItem);
        }
      }
      console.log("this are the newitems", newItems);
      setItemToShow(newItems);
    };

    if (products.length > 0) {
      newArrayProducts();
    }
  }, [products]);

  return (
    <FullScreenSection
      pt={16}
      pb={16}
      width="100vw"
      backgroundColor="var(--color-white)"
    >
      <main>
        <Box
          width="80vw"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={16}
        >
          <Heading id="product-section"> Products</Heading>

          {itemToShow.length === 0 ? (
            <Box>
              <Text fontSize="lg">Loading.....</Text>
            </Box>
          ) : (
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {itemToShow.map((item, index) => {
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
                );
              })}
            </Grid>
          )}
          <Link to="/products">
            <Button variant="link" colorScheme="teal">
              {" "}
              See all products
            </Button>
          </Link>
        </Box>
      </main>
    </FullScreenSection>
  );
};

export default ProductSection;
