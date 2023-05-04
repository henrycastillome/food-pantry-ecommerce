import {createContext, useContext, useState,useEffect} from 'react'
import axios from "axios";



const AuthContext=createContext(undefined);

export const AuthProvider=({children})=>{

    const [user, setUser]=useState(()=>{
        const storedUser=localStorage.getItem('user');
        return storedUser? storedUser : null
    })
    const [isAuthenticated, setIsAuthenticated]=useState(false)

    useEffect(()=>{
        if(user){
            localStorage.setItem('user', user)
            setIsAuthenticated(true)
        } else{
            localStorage.removeItem('user')
        }
    }, [user])

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
      }, []);
    
      function getProducts() {
        axios
          .get("http://localhost/my_php/food-pantry-ecommerce/api/inventory.php")
          .then(function (response) {
            console.log(response.data);
            setProducts(response.data);
          });
      }

   

    return (
        <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated, products, setProducts,getProducts}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext=()=>useContext(AuthContext)
