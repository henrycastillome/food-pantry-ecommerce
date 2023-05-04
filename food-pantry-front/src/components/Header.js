import { Box, Button, HStack } from "@chakra-ui/react";
import logonyc from "../images/logonyc.png";

const Header = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      maxWidth="100vw"
      width="100vw"
    >
      <HStack px={16} gap="30rem">
        <nav>
          <HStack>
            <img src={logonyc} alt="logonycdoe" />
          </HStack>
        </nav>
        <nav>
          <HStack spacing={4}>
            <Button bg="transparent">Home</Button>
            <Button bg="transparent">Products</Button>
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
