import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@babylonjs/loaders/glTF';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import AboutUs from './Components/AboutUs/AboutUs';
//import Footer from './Components/Footer/Footer';
import Order from './Components/Order/Order';
import NotFound from './Components/NotFound';
//import TextValues from './tools/TextValues';
import Results from './Components/Results/Results';
import Drawer from '@material-ui/core/Drawer';
import Cart from './Components/Cart/Cart';

const App = () => {
    let lang = localStorage.getItem("lang")
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        let items = JSON.parse(localStorage.getItem("cartItems"))
        if (items) {
            setCartItems(items)
        }

    }, []);

    const handleAddToCart = (id, name, logoPosition, screenshotFront, screenshotBack) => {
        setCartItems(prev => {
            //First time adding the item
            return [...prev, { id, name, logoPosition, amount: 1, screenshotFront, screenshotBack }];
        });
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }

    const handleChangeAmount = (id, logoPosition, amount) => {
        console.log(amount)
        if (amount < 1) {
            setCartItems(prev =>
                prev.reduce((ack, item) => {
                    if (item.id === id && item.logoPosition === logoPosition) {
                        return ack;
                    } else {
                        return [...ack, item];
                    }
                }, [])
            );
        }
        setCartItems(prev => {
            return prev.map(item =>
                item.id === id && item.logoPosition === logoPosition
                    ? { ...item, amount: amount } : item
            );
        })
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }

    const handleRemoveFromCart = (id, logoPosition) => {
        setCartItems(prev =>
            prev.reduce((ack, item) => {
                if (item.id === id && item.logoPosition === logoPosition) {
                    return ack;
                } else {
                    return [...ack, item];
                }
            }, [])
        );
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    };

    return (
        <div className="App">
            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    lang={lang}
                    cartItems={cartItems}
                    removeFromCart={(id, logoPosition) => handleRemoveFromCart(id, logoPosition)}
                    closeCart={() => setCartOpen(false)}
                    changeAmount={(id, logoPosition, amount) => handleChangeAmount(id, logoPosition, amount)}
                />

            </Drawer>
            <Header lang={lang} cartItems={cartItems} openCart={() => setCartOpen(true)} />
            <div className="Content">
                <Switch>
                    <Route exact path="/ostoskori">
                        <Order lang={lang} cartItems={cartItems} addToCart={(id, name, logoPosition, screenshotFront, screenshotBack) => handleAddToCart(id, name, logoPosition, screenshotFront, screenshotBack)}
                            removeFromCart={(id, logoPosition) => handleRemoveFromCart(id, logoPosition)} />
                    </Route>
                    <Route exact path="/tietoja">
                        <AboutUs lang={lang} />
                    </Route>
                    <Route exact path="/">
                        <Home lang={lang} />
                    </Route>
                    <Route
                        exact path="/tulokset/:id"
                        children={<Results lang={lang} handleAddToCart={(id, name, logoPosition, screenshotFront, screenshotBack) => handleAddToCart(id, name, logoPosition, screenshotFront, screenshotBack)} />}>
                    </Route>
                    <Route>
                        <NotFound lang={lang} />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

ReactDOM.render(<Router> <App /> </Router>, document.getElementById('root'))