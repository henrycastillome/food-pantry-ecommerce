import {
    Heading,
    Button,
    CardFooter,
    Card,
    CardBody,
    Image,
    Stack,
    Text,
    ButtonGroup,
    Wrap,
  } from "@chakra-ui/react";


const Cards=({src,product, alt, category, quantity, onClick, button2})=>{
    


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
                <Text color='gray.500' textAlign="center">{category}</Text>
                <Wrap justify='center' align='center'><Text fontSize='md' >Qty in stock: </Text>
                    <Text noOfLines={1} textAlign="center" color="teal" fontSize="2xl">
                   {quantity}
                </Text></Wrap>
              </Stack>
            </CardBody>
            
            <CardFooter justify='center'>
              <ButtonGroup >
                
                <Button onClick={onClick} variant="solid" colorScheme="teal">
                  {button2}
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
    )




}

export default Cards;