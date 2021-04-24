import React from 'react';
import TextValues from '../../tools/TextValues';
import { Wrapper } from './CartItem.styles';
import { Button, Input } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';


const CartItem = ({ lang, item, removeFromCart, changeAmount }) => {
    let logoPositionLabel = "";
    if (item.logoPosition) {
        let logoPositionText = item.logoPosition.split(":")
        logoPositionLabel = logoPositionText[logoPositionText.length - 1]
    }
    return (
        <Wrapper>
            <div>
                <h4>{item.name}</h4>
                <div className="information">
                    <p>{TextValues.logoPosition(lang)} {logoPositionLabel}</p>
                </div>
                <div>
                    <p>Some data</p>
                </div>
                <div className='buttons'>
                    <Button
                        size="small"
                        disableElevation
                        variant="contained"
                        onClick={() => removeFromCart(item.id, item.logoPosition)}
                    >
                        <DeleteForever />
                    </Button>
                    <Input
                        size="small"
                        style={{ marginLeft: "5%", textAlign: 'center', width: '50%' }}
                        type={'number'}
                        defaultValue={item.amount}
                        onChange={(e) => changeAmount(item.id, item.logoPosition, e.target.value)}
                    />


                </div>
            </div>
            <img src={item.screenshotFront} alt={""} />
            <img src={item.screenshotBack} alt={""} />
        </Wrapper>
    );
}

export default CartItem;