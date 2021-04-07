import React, { useState } from 'react';
import TextValues from '../../tools/TextValues';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Wrapper, Form } from './Cart.styles';
import CartItem from '../CartItem/CartItem';
import { Button, Input } from '@material-ui/core';
import emailjs from 'emailjs-com';

const Cart = ({ cartItems, addToCart, removeFromCart, closeCart }) => {

    const handleOrder = (e) => {
        e.preventDefault();
        console.log(e)
        
        console.log(cartItems, e.target, e.target.cartItems.value)
        /*emailjs.sendForm('service_l6d267z', '123456789', e.target, 'user_i5c9QI8T9mTXPfuiGqjqM')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
*/
    }
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
            {cartItems.length > 0 ?
                <div style={{width: '100%', alignItems: 'center', padding: '5px'}}>
                    <Form style={{alignItems: 'center'}} onSubmit={handleOrder}>
                        <Input style={{width: '100%', paddingTop: '10px'}} variant="outlined" type="text" placeholder="First Name" required name="first_name" />

                        <Input variant="outlined" style={{width: '100%', paddingTop: '10px'}} type="text" placeholder="Last Name" name="last_name" />

                        <Input style={{width: '100%', paddingTop: '10px'}} type="email" placeholder="Email Address" name="email_address" />

                        <Input style={{width: '100%', paddingTop: '10px'}} type="text" placeholder="Company Name" name="company_name" />

                        <Input style={{width: '100%', paddingTop: '10px'}} type="text" placeholder="Shipping Address" name="shipping_address" />

                        <Input style={{width: '100%', paddingTop: '10px'}} type="number" placeholder="Postcode" name="postcode" />

                        <Input style={{width: '100%', paddingTop: '10px'}} type="text" placeholder="Phone Number" name="phone_number" />

                        <Input multiline rows={4}  style={{width: '100%', paddingTop: '10px'}} type="text" placeholder="Additional Information" name="additional_information" />

                        <Button style={{width: '100%', padding: '10px'}} variant="contained" type="submit"> Order
                        </Button>
                    </Form>
                    


                </div> : null}

        </Wrapper >
    )
}
export default Cart;