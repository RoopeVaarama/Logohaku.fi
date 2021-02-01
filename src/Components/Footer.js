import React from 'react';
import TextValues from '../tools/TextValues';


const Footer = ({lang}) => {
    return (
        <div>
            <h1>{TextValues.footer(lang)}</h1>
        </div>
    )
}


export default Footer;