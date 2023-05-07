import { createContext, useContext, useState, useEffect } from "react";

const NewOrder = createContext(undefined);

export const NewProvider = ({ children }) => {
  const [newOrderItem, setNewOrderItem] = useState(()=>{
    const storedCart= localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart):[]
  });

  useEffect(()=>{
    if(newOrderItem){
        localStorage.setItem('cart', JSON.stringify(newOrderItem))
    } else {
        localStorage.removeItem('cart')
    }
  },[newOrderItem])

  const [cartItemCount, setCartItemCount] = useState(0);
  
  const [addingItems, setAddingItems] = useState([]);

  const handleAddToCart = (product, index) => {
    setAddingItems((prevItems) => ({
      ...prevItems,
      [index]: true,
    }));

    setNewOrderItem([...newOrderItem, product]);
    setTimeout(() => {
      setAddingItems((prevItems) => ({
        ...prevItems,
        [index]: false,
      }));
    }, 2000);
  };

  console.log(cartItemCount);
  console.log("this is the cart", newOrderItem);

  useEffect(() => {
    setCartItemCount(newOrderItem.length);
  }, [newOrderItem]);

  
  return (
    <NewOrder.Provider
      value={{
        newOrderItem,
        setNewOrderItem,
        cartItemCount,
        setCartItemCount,
        addingItems,
        handleAddToCart,
       
      }}
    >
      {children}
    </NewOrder.Provider>
  );
};

export const useNewOrderContext = () => useContext(NewOrder);
