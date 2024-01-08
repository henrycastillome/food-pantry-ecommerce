import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CartItem } from "../types/CartTypes";
import { Item } from "../types/ItemTypes";
import { handleAddToCart, handleRemoveCartItem, handleRemoveCartItemAll } from "../utils/cartUtils";
import { ContextError } from "../errors/Errors";

type CartContextType={
    cart:CartItem[]
    setCart:(cart:CartItem[])=>void
    handleAddToCartClick:(product:Item)=>void
    handleAddmoreToCartClick:(product:CartItem)=>void
    handleRemoveFromCartClick:(product:CartItem)=>void
    handleRemoveAllSingleItemFromCartClick:(product:CartItem)=>void
    totalQuantity:number

}
const CartContext=createContext<CartContextType | undefined>(undefined)

export const CartProvider=({children}:{children:ReactNode})=>{
    const [cart, setCart]=useState<CartItem[]>(()=>{
        const storedCart=localStorage.getItem("cart")
        return storedCart ? JSON.parse(storedCart) : []

    })
    
    //add to cart used by the add to cart button in the product section
    const handleAddToCartClick=(product:Item)=>{
        const newItem:CartItem={
            id:product.item_id,
            name:product.item_name,
            category:product.item_category,
            quantity:1,
        
        }
        //update the cart
        const updatedCart=handleAddToCart(cart,newItem)
        setCart(updatedCart)  
    
        }

        //add more to cart used by the plus button in the drawer
    const handleAddmoreToCartClick=(product:CartItem)=>{
        const newItem:CartItem={
            id:product.id,
            name:product.name,
            category:product.category,
            quantity:1,
        
        }
        //update the cart
        const updatedCart=handleAddToCart(cart,newItem)
        setCart(updatedCart)
    }


    //remove from cart used by the minus button in the drawer
    const handleRemoveFromCartClick=(product:CartItem)=>{
        const newItem:CartItem={
            id:product.id,
            name:product.name,
            category:product.category,
            quantity:1,
        
        }
        //update the cart
        const updatedCart=handleRemoveCartItem(cart,newItem)
        setCart(updatedCart)
    }

    const handleRemoveAllSingleItemFromCartClick=(product:CartItem)=>{
        const newItem:CartItem={
            id:product.id,
            name:product.name,
            category:product.category,
            quantity:1,
        
        }
        //update the cart
        const updatedCart=handleRemoveCartItemAll(cart,newItem)
        setCart(updatedCart)
    }

        //total items in the cart
        const totalQuantity=cart.reduce((total, item)=>total+item.quantity,0)
        
        console.log(cart)
      
        //update local storage

        useEffect(()=>{
            if(cart){
                localStorage.setItem("cart", JSON.stringify(cart))
            } else{
                localStorage.removeItem("cart")
            }
        },[cart])


        return(
            <CartContext.Provider value={{cart, setCart, handleAddToCartClick, handleAddmoreToCartClick, handleRemoveFromCartClick,totalQuantity, handleRemoveAllSingleItemFromCartClick}}>
                {children}
            </CartContext.Provider>
        )
        

}

export const useCartContext=()=>{
    const context=useContext(CartContext)
    if(context===undefined){
        throw new ContextError()
    }
    return context
}