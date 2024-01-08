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

export function handleRemoveCartItem(
    cart: CartItem[],
    cartItemToRemove:CartItem
): CartItem[]{
    const existingCartItem = cart.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )
    if(existingCartItem?.quantity === 1){
        return cart.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    } else{
        return cart.map(cartItem => 
            cartItem.id === cartItemToRemove.id ?
            {...cartItem, quantity: cartItem.quantity - 1} :
            cartItem
        )
    }

}


export function handleRemoveCartItemAll(
    cart: CartItem[],
    cartItemToRemove:CartItem
): CartItem[]{
    return cart.filter(cartItem => cartItem.id !== cartItemToRemove.id)
}