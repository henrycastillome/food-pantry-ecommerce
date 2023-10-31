import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CartItem } from "../types/CartTypes";
import { Item } from "../types/ItemTypes";
import { handleAddToCart } from "../utils/cartUtils";
import { ContextError } from "../errors/Errors";

type CartContextType={
    cart:CartItem[]
    handleAddToCartClick:(product:Item)=>void
    totalQuantity:number

}
const CartContext=createContext<CartContextType | undefined>(undefined)

export const CartProvider=({children}:{children:ReactNode})=>{
    const [cart, setCart]=useState<CartItem[]>([])
    

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
        const totalQuantity=cart.reduce((total, item)=>total+item.quantity,0)


        return(
            <CartContext.Provider value={{cart, handleAddToCartClick, totalQuantity}}>
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