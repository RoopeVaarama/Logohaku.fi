import React from 'react';
import TextValues from '../tools/TextValues';


const Results = ({lang}) => {
    return (
        <div>
            <h1>{TextValues.results(lang)}</h1>
        </div>
    )
}

export default Results;