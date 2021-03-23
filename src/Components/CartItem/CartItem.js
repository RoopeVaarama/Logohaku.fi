import React from 'react';
import { Wrapper } from './CartItem.styles';
import Button from '@material-ui/core/Button';
import logo from "../../assets/paisto.png";


const CartItem = ({ item, addToCart, removeFromCart }) => {
    return (
        <Wrapper>
            <div>
                <h4>{item.title}</h4>
                <div className="information">
                    <p>logo position{item.position}</p>
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
                    <p>{item.amount}</p>
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
            <img src={logo} alt={logo} />
        </Wrapper>
    );
}

export default CartItem;