import { Box, Button, HStack } from "@chakra-ui/react";
import logonycnobg from '../images/nycdoenobg.png'

const Header = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      maxWidth="100vw"
      width="100vw"
      backgroundColor='var(--color-white)'
      pt={8}
      pb={4}
    >
      <HStack px={16} gap="30rem">
        <nav>
          <HStack>
            <img src={logonycnobg} alt="logonycdoe" width='150px'/>
          </HStack>
        </nav>
        <nav>
          <HStack spacing={4}>
            <Button bg="transparent">Home</Button>
            <Button bg="transparent">Products</Button>
            <Button bg="transparent">About</Button>
            <Button variant="solid" colorScheme="teal">
              Sign up
            </Button>
            <Button variant="outline" colorScheme="teal">
              {" "}
              Login
            </Button>
            <Button fontSize='sm' as='u' variant="link" colorScheme="teal">
              {" "}
              Admin
            </Button>
          </HStack>
        </nav>
      </HStack>
    </Box>
  );
};
export default Header;
