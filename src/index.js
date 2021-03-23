import React, { useState } from 'react';
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
import TextValues from './tools/TextValues';
import Results from './Components/Results/Results';
import Drawer from '@material-ui/core/Drawer';
import Cart from './Components/Cart/Cart';

const App = () => {
    let lang = localStorage.getItem("lang")
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (id, name, logoPosition) => {
        setCartItems(prev => {

            //Is item in cart already and does the position match
            const isItemInCart = prev.find(item => item.id === id);
            const isItemPosition = prev.find(item => item.logoPosition === logoPosition);
            console.log(isItemInCart)

            if (isItemInCart && isItemPosition) {
                return prev.map(item =>
                    item.id === id
                        ? { ...item, amount: item.amount + 1 }
                        : item.id
                );
            }
            //First time adding the item
            return [...prev, { id, name, logoPosition, amount: 1 }];
        });
        //console.log("cartItems", cartItems)
        //console.log("info", id, name, logoPosition)
    }

    const handleRemoveFromCart = (id, logoPosition) => {
        setCartItems(prev =>
            prev.reduce((ack, item) => {
                if (item.id === id && item.logoPosition === logoPosition) {
                    if (item.amount === 1) return ack;
                    return [...ack, { ...item, amount: item.amount - 1 }];
                } else {
                    return [...ack, item];
                }
            }, [])
        );
    };

    return (
        <div className="App">
            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    cartItems={cartItems}
                    addToCart={(id, name, logoPosition) => handleAddToCart(id, name, logoPosition)}
                    removeFromCart={(id, logoPosition) => handleRemoveFromCart(id, logoPosition)}
                >

                </Cart>

            </Drawer>
            <Header lang={lang} cartItems={cartItems} openCart={() => setCartOpen(true)} />
            <div className="Content">
                <Switch>
                    <Route exact path="/ostoskori">
                        <Order lang={lang} />
                    </Route>
                    <Route exact path="/tietoja">
                        <AboutUs lang={lang} />
                    </Route>
                    <Route exact path="/">
                        <Home lang={lang} />
                    </Route>
                    <Route
                        exact path="/tulokset/:id"
                        children={<Results lang={lang} handleAddToCart={(id, name, logoPosition) => handleAddToCart(id, name, logoPosition)} />}>
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