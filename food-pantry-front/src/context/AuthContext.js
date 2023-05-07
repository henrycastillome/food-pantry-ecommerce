import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? storedUser : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const [isCustomerValid, setIsCustomerValid]=useState(false)
  const [customer, setCustomer]=useState(()=>{
    const storedCustomer=localStorage.getItem('customer');
    return storedCustomer ? JSON.parse(storedCustomer) : []
  })

  useEffect(()=>{
    if(customer){
      localStorage.setItem('customer', JSON.stringify(customer))
      setIsCustomerValid(true)
    } else{
      localStorage.removeItem("customer")
    }
  }, [customer])

  console.log(customer)
  console.log(isCustomerValid)

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

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        products,
        setProducts,
        getProducts,
        handleClick,
        customer, 
        setCustomer,
        isCustomerValid,
        setIsCustomerValid
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
