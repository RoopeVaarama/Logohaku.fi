import React, { useState  } from 'react';
import TextValues from '../../tools/TextValues';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Wrapper } from './Cart.styles';
import CartItem from '../CartItem/CartItem';
import { Button, FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core';

const Cart = ({ cartItems, addToCart, removeFromCart, closeCart }) => {
    console.log(cartItems)
    const [value, setValue] = useState(""),
        onInput = ({ target: { value } }) => setValue(value),
        submitForm = e => {
            if (value !== "") {
                console.log("value ", value)
                setValue()
                //history.push('/tulokset/' + value);
            } else {
                e.preventDefault();
            }
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
                <div>
                    <FormControl>
                        <InputLabel htmlFor="my-input">First Name</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" />
                        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Last Name</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" />

                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Email address</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" />

                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Company name</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" />

                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Shipping adress</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" />

                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Postcode</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" />

                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Phone number</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" />

                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="my-input">Additional information</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" />

                    </FormControl>

                    <Button
                        size="large"
                        variant="contained"
                        onClick={closeCart}>
                        Order
            </Button>
                </div> : null}

        </Wrapper >
    )
}
export default Cart;