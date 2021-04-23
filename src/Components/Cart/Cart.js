import React, { useRef } from 'react';
import TextValues from '../../tools/TextValues';
import { Wrapper, Form } from './Cart.styles';
import CartItem from '../CartItem/CartItem';
import { Button, Input } from '@material-ui/core';
import emailjs from 'emailjs-com';

const Cart = ({ lang, cartItems, removeFromCart, closeCart, changeAmount }) => {

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

        let items = [];
        cartItems.map(item => {
            return items.push(item.name, TextValues.amount(lang), item.amount, TextValues.logoPosition(lang), item.logoPosition)
        })

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
    }

    return (
        <Wrapper>
            <h1>{TextValues.yourShoppingCart(lang)}</h1>
            {cartItems.length === 0 ? <p>{TextValues.noItemsInCart(lang)}</p> : null}
            {cartItems.map(item => (
                <CartItem
                    lang={lang}
                    key={item.id}
                    item={item}
                    removeFromCart={removeFromCart}
                    changeAmount={changeAmount}
                >

                </CartItem>
            ))}
            {cartItems.length > 0 ?
                <div style={{ width: '100%', alignItems: 'center', padding: '5px' }}>
                    <Form style={{ alignItems: 'center' }} onSubmit={handleOrder}>
                        <Input style={{ width: '100%', paddingTop: '10px' }} variant="outlined" type="text" placeholder={TextValues.firstName(lang)} required inputRef={firstNameRef} />

                        <Input variant="outlined" style={{ width: '100%', paddingTop: '10px' }} type="text" placeholder={TextValues.lastName(lang)} inputRef={lastNameRef} />

                        <Input style={{ width: '100%', paddingTop: '10px' }} type="email" placeholder={TextValues.emailAddress(lang)} inputRef={emailAddressRef} />

                        <Input style={{ width: '100%', paddingTop: '10px' }} type="text" placeholder={TextValues.companyName(lang)} inputRef={companyNameRef} />

                        <Input style={{ width: '100%', paddingTop: '10px' }} type="text" placeholder={TextValues.shippingAddress(lang)} inputRef={shippingAddressRef} />

                        <Input style={{ width: '100%', paddingTop: '10px' }} type="number" placeholder={TextValues.postCode(lang)} inputRef={postcodeRef} />

                        <Input style={{ width: '100%', paddingTop: '10px' }} type="text" placeholder={TextValues.phoneNumber(lang)} inputRef={phoneNumberRef} />

                        <Input multiline rows={4} style={{ width: '100%', paddingTop: '10px' }} type="text" placeholder={TextValues.additionalInformation(lang)} inputRef={additionalInformationRef} />

                        <Button style={{ width: '100%', padding: '10px' }} variant="contained" color="secondary" type="submit"> {TextValues.orderButton(lang)}
                        </Button>
                    </Form>

                </div> : null}
        </Wrapper >
    )
}
export default Cart;