import React from 'react';
import TextValues from '../tools/TextValues';


const Order = ({lang}) => {

    return (
        <div>
            <h1>{TextValues.order(lang)}</h1>
        </div>
    )
}


export default Order;