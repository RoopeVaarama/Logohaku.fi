import React from 'react';
import TextValues from '../../tools/TextValues';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Wrapper } from './Cart.styles';
import CartItem from '../CartItem/CartItem';
import Button from '@material-ui/core/Button';

const Cart = ({ cartItems, addToCart, removeFromCart, closeCart }) => {
    console.log(cartItems)
    return (
        <Wrapper>
            <h1>Your Shopping Cart</h1>
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
            <Link to="/ostoskori">
            <Button
                size="large"
                variant="contained"
                onClick={closeCart}>
                Proceed to order
            </Button>
            </Link>
        </Wrapper>
    )
}
export default Cart;