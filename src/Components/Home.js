import React from 'react';
import TextValues from '../tools/TextValues';
import {Link} from 'react-router-dom';


const Home = ({lang}) => {
    return (
        <div>
            <h1>{TextValues.home(lang)}</h1>
            <button>
                <Link to="/results">Search</Link>
            </button>
        </div>
    )
}

export default Home;