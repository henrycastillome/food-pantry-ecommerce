import { Box, Button, HStack } from "@chakra-ui/react";
import logonyc from "../images/logonyc.png";

const Header = () => {
  return (
    <Box
      style={{ outline: "red dashed 1px" }}
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent='center'
      maxWidth="100vw"
      width="100vw"
      
     
    >
      <HStack
        px={16}
     
        style={{ outline: "blue dashed 1px" }}
        gap='30rem'
        
      >
        <nav>
          <HStack style={{ outline: "green dashed 1px" }}>
            <img src={logonyc} alt="logonycdoe" />
          </HStack>
        </nav>
        <nav>
          <HStack spacing={4} style={{ outline: "green dashed 1px" }}>
            <Button bg='transparent'>Home</Button>
            <Button bg='transparent'>Products</Button>
            <Button variant="solid" colorScheme="teal">
              Sign up
            </Button>
            <Button variant="outline" colorScheme="teal">
              {" "}
              Login
            </Button>
            <Button variant="ghost" colorScheme="teal">
              {" "}
              Admin Log in
            </Button>
          </HStack>
        </nav>
      </HStack>
    </Box>
  );
};
export default Header;
