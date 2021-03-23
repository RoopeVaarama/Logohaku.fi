import React from 'react';
import { Wrapper } from './CartItem.styles';
import Button from '@material-ui/core/Button';


const CartItem = ({ item, addToCart, removeFromCart }) => {
    return (
        <Wrapper>
            <div>
                <h3>Title</h3>
                <div className="information">
                    <p>Amount</p>
                    <p>Price</p>
                </div>
                <div className='buttons'>
                    <Button
                        size="small"
                        disableElevation
                        variant="contained"
                        onClick={() => console.log("-")}
                    >
                        -
                </Button>
                    <p>0</p>
                    <Button
                        size="small"
                        disableElevation
                        variant="contained"
                        onClick={() => console.log("+")}
                    >
                        +
                </Button>

                </div>
            </div>
            <img src={item.image} alt={item.title} />
        </Wrapper>
    );
}

export default CartItem;