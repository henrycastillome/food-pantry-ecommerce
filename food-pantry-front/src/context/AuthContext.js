import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? storedUser : null;
  }); 
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  console.log("isAuthenticated", isAuthenticated)
  const [isCustomerValid, setIsCustomerValid]=useState(false)
  const [customer, setCustomer]=useState(()=>{
    const storedCustomer=localStorage.getItem('customer');
    return storedCustomer ? JSON.parse(storedCustomer) : null
  })

  useEffect(()=>{
    if(customer){
      localStorage.setItem('customer', JSON.stringify(customer))
      setIsCustomerValid(true)
    } else{
      localStorage.removeItem("customer")

      setIsCustomerValid(false)
    }
  }, [customer])

  console.log("customer", customer)
  console.log(isCustomerValid)

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  function getProducts() {
    axios
      .get("https://food-pantry.herokuapp.com/inventory.php")
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
