import { Box, Button, HStack } from "@chakra-ui/react"
import { useAuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";



const NavBarAdmin=()=>{
    const {user, setUser,isAuthenticated, setIsAuthenticated}=useAuthContext();
    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem('user');
        setUser(null)
        setIsAuthenticated(false)
        navigate('/admin')
        

    }

    return(
        <Box color='teal' >
            <nav>
                <HStack>
                    <Button variant="ghost"> Profile</Button>
                    <Button variant="solid" onClick={(handleLogout)}> Logout</Button>
                    {isAuthenticated ? <a>You are logged in as <b>{user}</b></a> : " "}

                </HStack>
            </nav>
        </Box>
    )
}

export default NavBarAdmin
