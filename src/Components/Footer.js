import React from 'react';
import TextValues from '../tools/TextValues';
import "./Footer.css";


const Footer = ({lang}) => {
    return (
        <div className="Footer">
            <h1>{TextValues.footer(lang)}</h1>
        </div>
    )
}


export default Footer;