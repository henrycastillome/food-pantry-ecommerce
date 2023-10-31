import { useMemo } from "react";
import { CartItem } from "../types/CartTypes";



export function userOrderData(
    customer:any, 
    cart:CartItem[]
    )
    {
        
    let customerSubmit=useMemo(()=>{
        return {user_id:Number(customer?.user_id)}},[customer]
    )

    const orderSubmit=useMemo(()=>{
        return {
            ...customerSubmit,
            items:cart.map((item:any)=>({
                item_id:Number(item.item_id),
                quantity:Number(item.quantity)
            })),
        };
    },[customerSubmit, cart])

    return orderSubmit

    
}