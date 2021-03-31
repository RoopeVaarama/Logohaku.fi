import React from 'react';
import TextValues from '../../tools/TextValues';
import { Wrapper, Title } from './Order.style';
import { Button, Grid, Card, CardContent } from '@material-ui/core';
import CartItem from '../CartItem/CartItem';

const Order = ({ lang, cartItems, addToCart, removeFromCart }) => {

    return (
        <Wrapper>
            <CardContent>
                <Title>Ostoskori</Title>
                <br/>
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
            </CardContent>
            <Button variant="contained" disableElevation>
                Order
            </Button>
        </Wrapper>
    )
}


export default Order;