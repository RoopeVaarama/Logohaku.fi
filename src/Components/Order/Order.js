import React from 'react';
import TextValues from '../../tools/TextValues';
import { Wrapper, Title } from './Order.style';
import { Button, Grid, Card, CardContent } from '@material-ui/core';

const Order = ({ lang, cartItems }) => {

    return (
        <Wrapper>
            <CardContent>
                <Title>
                Ostoskori
                </Title>
            </CardContent>
            <Button variant="contained">
                Order
            </Button>
        </Wrapper>
    )
}


export default Order;