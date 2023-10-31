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

interface ProductCardProps {
  src?: string;
  alt?:string;
  product?: string;
  category?:string;
  quantity?: number;
  onClick?:()=>void;
  button2?:string;
}
const Cards: React.FC<ProductCardProps> = ({src,alt,product,category,quantity,onClick,button2}: ProductCardProps) => {
  return (
    <Card boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;">
      <CardBody>
        {src ? (
          <Image src={src} alt={alt} borderRadius="lg" />
        ) : (
          <Image
            src="https://via.placeholder.com/150"
            alt="Placeholder"
            borderRadius="lg"
          />
        )}
        <Stack mt="6" spacing="3">
          <Heading textAlign="center" size="md">
            {product}
          </Heading>
          <Heading color="gray.500" textAlign="center">
            {category}
          </Heading>
          <Wrap justify="center" align="center">
            <Text fontSize="md">Qty in stock:</Text>
            <Text noOfLines={1} textAlign="center" color="teal" fontSize="2xl">
              {quantity}
            </Text>
          </Wrap>
        </Stack>
      </CardBody>

      <CardFooter justify="center">
        <ButtonGroup>
          <Button onClick={onClick} variant="solid" colorScheme="teal">
            {button2}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Cards;
