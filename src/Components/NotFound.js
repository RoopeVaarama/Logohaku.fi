import React from 'react';
import TextValues from '../tools/TextValues';


const NotFound = ({lang}) => {
    return (
        <div>
            <h1>{TextValues.notFound(lang)}</h1>
        </div>
    )
}


export default NotFound;