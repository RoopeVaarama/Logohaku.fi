import React, { useState, useRef } from 'react';
import TextValues from '../../tools/TextValues';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Wrapper, Form } from './Cart.styles';
import CartItem from '../CartItem/CartItem';
import { Button, Input } from '@material-ui/core';
import emailjs from 'emailjs-com';

const Cart = ({ cartItems, addToCart, removeFromCart, closeCart }) => {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailAddressRef = useRef();
    const companyNameRef = useRef();
    const shippingAddressRef = useRef();
    const postcodeRef = useRef();
    const phoneNumberRef = useRef();
    const additionalInformationRef = useRef();

    const handleOrder = (e) => {
        e.preventDefault();
        let firstNameValue = firstNameRef.current.value;
        let lastNameValue = lastNameRef.current.value;
        let emailAddressValue = emailAddressRef.current.value;
        let companyNameValue = companyNameRef.current.value;
        let shippingAddressValue = shippingAddressRef.current.value;
        let postcodeValue = postcodeRef.current.value;
        let phoneNumberValue = phoneNumberRef.current.value;
        let additionalInformationValue = additionalInformationRef.current.value;


        //console.log(cartItems)
        let items = [];
        cartItems.map(item => {
            //console.log(item)
            items.push(item.name, "määrä", item.amount, "logo", item.logoPosition)
        })

        //console.log(items)
        
        const templeteParams = {
            firstNameValue: firstNameValue,
            lastNameValue: lastNameValue,
            emailAddressValue: emailAddressValue,
            companyNameValue: companyNameValue,
            shippingAddressValue: shippingAddressValue,
            postcodeValue: postcodeValue,
            phoneNumberValue: phoneNumberValue,
            additionalInformationValue: additionalInformationValue,
            cartItems: items,
        }

        
        emailjs.send('service_l6d267z', '123456789', templeteParams, 'user_i5c9QI8T9mTXPfuiGqjqM')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        //console.log(cartItems, e.target, e.target.cartItems.value)
        /*emailjs.sendForm('service_l6d267z', '123456789', e.target, 'user_i5c9QI8T9mTXPfuiGqjqM')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });*/

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
                <div style={{ width: '100%', alignItems: 'center', padding: '5px' }}>
                    <Form style={{ alignItems: 'center' }} onSubmit={handleOrder}>
                        <Input style={{ width: '100%', paddingTop: '10px' }} variant="outlined" type="text" placeholder="First Name" required inputRef={firstNameRef} />

                        <Input variant="outlined" style={{ width: '100%', paddingTop: '10px' }} type="text" placeholder="Last Name" inputRef={lastNameRef} />

                        <Input style={{ width: '100%', paddingTop: '10px' }} type="email" placeholder="Email Address" inputRef={emailAddressRef} />

                        <Input style={{ width: '100%', paddingTop: '10px' }} type="text" placeholder="Company Name" inputRef={companyNameRef} />

                        <Input style={{ width: '100%', paddingTop: '10px' }} type="text" placeholder="Shipping Address" inputRef={shippingAddressRef} />

                        <Input style={{ width: '100%', paddingTop: '10px' }} type="number" placeholder="Postcode" inputRef={postcodeRef} />

                        <Input style={{ width: '100%', paddingTop: '10px' }} type="text" placeholder="Phone Number" inputRef={phoneNumberRef} />

                        <Input multiline rows={4} style={{ width: '100%', paddingTop: '10px' }} type="text" placeholder="Additional Information" inputRef={additionalInformationRef} />

                        <Button style={{ width: '100%', padding: '10px' }} variant="contained" type="submit"> Order
                        </Button>
                    </Form>

                </div> : null}
        </Wrapper >
    )
}
export default Cart;