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
        //if(!(cartItems.id.includes(id))){
        setCartItems(cartItems => [...cartItems, { id, name, logoPosition }])

        console.log(cartItems)
        console.log(id, name, logoPosition)
    }

    const handleRemoveFromCart = (id) => {
        return null
    }

    return (
        <div className="App">
            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    cartItems={cartItems}
                    //addToCart={handleAddToCart}
                    removeFromCart={() => handleRemoveFromCart()}
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