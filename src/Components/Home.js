import React from 'react';
import TextValues from '../tools/TextValues';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Home = ({lang}) => {
    return (
        <div>
            <h1>{TextValues.home(lang)}</h1>
            <Button variant="primary" size="lg">
                <Link to="/results">Search</Link>
            </Button>
        </div>
    )
}

export default Home;