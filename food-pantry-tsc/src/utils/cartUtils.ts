import { CartItem } from "../types/CartTypes";

export function handleAddToCart(
    cart: CartItem[],
    newCartItem:CartItem 
) :  CartItem[]{
    const existingCartItem = cart.find(
        cartItem => cartItem.id === newCartItem.id
    )
    if(existingCartItem){
        return cart.map(cartItem=>{
            if(cartItem.id === newCartItem.id){
                return {
                    ...cartItem,
                    quantity: cartItem.quantity + 1
                }
            } else{
                return cartItem
            }
        })
    }
    

    return [...cart, {...newCartItem, quantity:1}]
    
}

   
