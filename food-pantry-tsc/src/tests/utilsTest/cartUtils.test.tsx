import { CartItem } from "../../types/CartTypes"
import { handleAddToCart } from "../../utils/cartUtils";



describe("CartUtils", () => {
    it("should add a new cart item to an empty cart",()=>{
        const cart:CartItem[]=[];
        const newCartItem:CartItem={
            id:1,
            name:"Item 1",
            category:"Category 1",
            quantity:1
        }
        const updatedCart=handleAddToCart(cart, newCartItem)
        expect(updatedCart).toEqual([newCartItem])
    })

    it("should increment the quantity of an existing cart item",()=>{
        const cart:CartItem[]=[
            {
                id:1,
                name:"Item 1",
                category:"Category 1",
                quantity:1
            }
        ];
        const newCartItem:CartItem={
            id:1,
            name:"Item 1",
            category:"Category 1",
            quantity:1
        }
        const updatedCart=handleAddToCart(cart, newCartItem)
        expect(updatedCart).toEqual([{
            id:1,
            name:"Item 1",
            category:"Category 1",
            quantity:2
        }])

    })

    it("should return a new cart array with the updated cart item",()=>{
        const cart:CartItem[]=[
            {
                id:1,
                name:"Item 1",
                category:"Category 1",
                quantity:1
            }
        ];
        const newCartItem:CartItem={
            id:1,
            name:"Item 1",
            category:"Category 1",
            quantity:1
        }
        const updatedCart=handleAddToCart(cart, newCartItem)
        expect(updatedCart).not.toBe(cart)
        expect(updatedCart[0]).not.toBe(cart[0])
    })
})