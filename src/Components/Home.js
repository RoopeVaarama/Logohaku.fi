import React from 'react';
import TextValues from '../tools/TextValues';


const Home = ({lang}) => {
    return (
        <div>
            <h1>{TextValues.home(lang)}</h1>
        </div>
    )
}

export default Home;