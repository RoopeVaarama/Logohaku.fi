import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './index.css';
import Header from './Components/Header';
import Home from './Components/Home';
import AboutUs from './Components/AboutUs';
import Footer from './Components/Footer';
import Order from './Components/Order';
import NotFound from './Components/NotFound';
import TextValues from './tools/TextValues';

const App = () => {
    let lang = localStorage.getItem("lang")

    return (
        <div className="App">
            <Header />
            <div className="Content">
                <Switch>
                    <Route exact path="/tilaus">
                        <Order lang={lang} />
                    </Route>
                    <Route exact path="/about">
                        <AboutUs lang={lang} />
                    </Route>
                    <Route exact path="/">
                        <Home lang={lang} />
                    </Route>
                    <Route>
                        <NotFound lang={lang} />
                    </Route>
                </Switch>
                <Footer lang={lang} />
            </div>
        </div>
    );
}

ReactDOM.render(<Router> <App /> </Router>, document.getElementById('root'))