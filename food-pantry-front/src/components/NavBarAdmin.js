import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logonycnobg from "../images/nycdoenobg.png";
import { Link } from "react-router-dom";

const NavBarAdmin = () => {
  const { user, setUser,  setIsAuthenticated } =
    useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/admin");
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      maxWidth="100vw"
      width="100vw"
      backgroundColor="var(--color-white)"
      pt={8}
      pb={4}
      position='fixed'
      zIndex={1000}
      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
      top='0'
    >
      <HStack px={16} gap="40rem">
        <nav>
          <HStack>
            <img src={logonycnobg} alt="logonycdoe" width="150px" />
          </HStack>
        </nav>
        <nav>
          <HStack spacing={4} color="var(--color-dark)">
          <Text fontSize="sm"  color="var(--color-dark)">
                {" "}
                Logged in as <b>{user} </b>{" "}
              </Text>
            <Link to="/">
            <Button onClick={handleLogout} fontSize="sm"  bg="transparent">
                <Text as="u">(Logout)</Text>
              </Button>
            </Link>
          </HStack>
        </nav>
      </HStack>
    </Box>
  );
};

export default NavBarAdmin;


