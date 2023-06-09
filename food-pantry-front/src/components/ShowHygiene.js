import { useAuthContext } from "../context/AuthContext";
import {
  Box,
  Text,
  Grid,
  GridItem
} from "@chakra-ui/react";
import Cards from "../components/Cards";
import { useEffect, useState } from "react";
import { useNewOrderContext } from "../context/NewOrder";

const ShowHygiene = () => {
  const { products } = useAuthContext();
  const [hygieneItems, setHygieneItems] = useState([]);
  const { addingItems, handleAddToCart } = useNewOrderContext();

  useEffect(() => {
    const newArrayHigiene = () => {
      const newHygiene = [];
      products.forEach((element) => {
        console.log("loop", element.item_category);
        if (element.item_category === "Hygiene") {
          newHygiene.push(element);
        }
      });
      console.log("new Hygiene ", newHygiene);
      setHygieneItems(newHygiene);
    };
    if (products.length > 0) {
      newArrayHigiene();
    }
  }, [products]);

  return (
    <Box>
      {hygieneItems.length === 0 ? (
        <Box>
          <Text fontSize="lg">Loading.....</Text>
        </Box>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {hygieneItems.map((item, index) => {
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
    </Box>
  );
};
export default ShowHygiene;
