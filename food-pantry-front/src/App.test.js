import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import { NewProvider, useNewOrderContext } from './context/NewOrder';


const MockComponent=()=>{
  const {newOrderItem, cartItemCount, handleAddtoCart}=useNewOrderContext()

  return (
    <div>
    <div data-testid='cartItemCount'>{cartItemCount}</div>
    <button 
      data-testid="addToCartButton"
      onClick={()=> handleAddtoCart({id:1, name:'product'},0)}
    >
      Add to Cart
    </button>
    {newOrderItem.map((item)=>(
      <div key={item.id}> {item.name}</div>
    ))}
    </div>
  )
}

describe("New Order context",()=>{
  beforeEach(()=>{
    localStorage.clear();
  })

  it("add item to card and updates cart item count",()=>{
    render(
      <NewProvider>
        <MockComponent />
      </NewProvider>
    )

    const addToCartButton=screen.getByTestId('addToCartButton')
    const cartItemCount=screen.getByTestId('cartItemCOunt')

    expect(cartItemCount.textContent).toBe('0')

    fireEvent.click(addToCartButton)

    expect(cartItemCount.textContent).toBe('1')
    expect(screen.getByText('product')).toBeInTheDocument()
  })
})
