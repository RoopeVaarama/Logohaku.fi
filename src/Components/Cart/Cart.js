import React from 'react';
import TextValues from '../../tools/TextValues';
import { Wrapper } from './Cart.styles';
import CartItem from '../CartItem/CartItem';
const Cart = ({ cartItems, addToCart, removeFromCart }) => {
    console.log(cartItems)
    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No items in cart.</p> : null}
            {cartItems.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                >

                </CartItem>
            ))}

            <h2>Total</h2>
        </Wrapper>
    )
}
export default Cart;