import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import TextValues from '../tools/TextValues';


const Header = () => {
    const padding = {
        padding: 5
    }
    return (
        <div>
            <ul>
            <Link style={padding} to="/">Home</Link>
            <Link style={padding} to="/tilaus">Tilaus</Link>
            <Link style={padding} to="/about">About</Link>
            </ul>
        </div>
    )
}

export default Header;