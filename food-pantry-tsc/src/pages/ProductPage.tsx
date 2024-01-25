import Header from "../sections/Header";
import { Box, Heading } from "@chakra-ui/react";

const ProductPage = () => {
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
      </>
    </main>
  );
};

export default ProductPage;
