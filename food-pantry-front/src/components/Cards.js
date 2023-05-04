import {
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    VStack,
    Button,
    Spinner,
    HStack,
    InputRightElement,
    InputGroup,
    Select,
    CardFooter,
    Card,
    CardBody,
    Image,
    Stack,
    Text,
    ButtonGroup,
    Container,
    Divider,
    Wrap,
  } from "@chakra-ui/react";

const Cards=({src,product, alt, category, quantity, buttonSolid, buttonGhost})=>{
    return(

        <Card boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px;'>
            <CardBody>
              {src ? (
                <Image
                  src={src}
                  alt={alt}
                  borderRadius="lg"
                />
              ) : (
                <Image
                  src="https://placehold.jp/300x300.png"
                  alt="placeholder"
                  borderRadius="lg"
                />
              )}
              <Stack mt="6" spacing="3">
                <Heading textAlign="center" size="md">
                  {product}
                </Heading>
                <Text textAlign="center">{category}</Text>
                <Wrap justify='center' align='center'><Text fontSize='md' >Qty in stock: </Text>
                    <Text noOfLines={1} textAlign="center" color="teal" fontSize="2xl">
                   {quantity}
                </Text></Wrap>
              </Stack>
            </CardBody>
            
            <CardFooter justify='center'>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="teal">
                  Order Now
                </Button>
                <Button variant="ghost" colorScheme="teal">
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
    )




}

export default Cards;