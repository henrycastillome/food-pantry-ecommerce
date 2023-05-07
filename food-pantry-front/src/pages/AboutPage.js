import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import FullScreenSection from "../components/FullScreenSection";
import Header from "../components/Header";
import {
  Heading,
  Box,
  Text,
  Grid,
  GridItem,
  Button,
  HStack,
  ButtonGroup,
  Card,
  Container,
} from "@chakra-ui/react";
import Loader from "../components/Loader";

const AboutPage = () => {
    const [isLoading, setIsLoading]=useState(true)
  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false);
    }, 1500)
  }, []);
    
  return (
    <main>
        {isLoading? <Loader /> 
        :
        (
    <>
    <Header />
    <Box pt={32} >
        
        <Box className="aboutPage">
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
                About
              </Heading>
            </Box>
          </Box>
        </Box>
        </Box>
      <FullScreenSection
        p={16}
        width="100vw"
        backgroundColor="var(--color-white)"
      >
        <Container>
          <Box color='var(--color-dark)'>
            <Text pb={4}>
              <b>Welcome to the NYC public school Food Pantry website! </b> Our goal is
              to make it easier for parents to access the food pantry's
              resources by allowing them to order items in advance.{" "}
            </Text>
            <Text pb={4}>
              Our food pantry was established to provide support for families in
              need within our school community. We believe that access to
              healthy food is essential for academic success and overall
              well-being.{" "}
            </Text>
            <Text pb={4}>
              Using our website, parents can view the inventory of the food
              pantry and place orders in advance.{" "}
            </Text>
            <Text pb={4}>
              Orders are filled on a first-come, first-served basis, and we ask
              that <b>parents submit their orders by Monday </b> to ensure
              that we have time to prepare them. <b><u>Orders can be picked up at the
              food pantry during 4-5pm.</u></b>{" "}
            </Text>
            
            <Text pb={4}>
              {" "}
              If you have any questions or concerns about our food pantry or our
              website, please feel free to contact us at [contact information].{" "}
            </Text>
            <Text pb={4}> </Text>

            <Text as='b' fontSize='lg' >
              {" "}
              Thank you for visiting our website, and we look forward to serving
              you!
            </Text>
          </Box>
        </Container>
      </FullScreenSection>
      <Footer />
    </>
        )}
    </main>
  );
};

export default AboutPage;
