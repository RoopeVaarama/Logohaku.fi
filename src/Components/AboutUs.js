import React from 'react';
import TextValues from '../tools/TextValues';


const AboutUs = ({lang}) => {
    return (
        <div>
            <h1>{TextValues.aboutUs(lang)}</h1>
        </div>
    )
}
export default AboutUs;