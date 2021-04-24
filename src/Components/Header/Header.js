import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from 'react-router-dom';
import TextValues from '../../tools/TextValues';
import "./Header.css";
import { CSSTransition } from "react-transition-group";
import logo from "../../assets/paisto.png";
import { Button } from '@material-ui/core';
import { Menu, AddShoppingCart } from '@material-ui/icons';


const Header = ({ lang, cartItems, openCart }) => {

    const ButtonClick = () => {
        let lang = localStorage.getItem("lang")
        if (lang === "fi") {
            localStorage.setItem("lang", "eng")
        } else {
            localStorage.setItem("lang", "fi")
        }
        window.location.reload(false)
    }

    const [isNavVisible, setNavVisibility] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 700px)");
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    const handleMediaQueryChange = mediaQuery => {
        if (mediaQuery.matches) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    const toggleNav = () => {
        setNavVisibility(!isNavVisible);
    };
    return (
        <header className="Header">

            <Link to="/">
                <img src={logo} className="Logo" alt="logo" />
            </Link>
            <CSSTransition
                in={!isSmallScreen || isNavVisible}
                timeout={350}
                classNames="NavAnimation"
                unmountOnExit
            >
                <nav className="Nav">
                    <Button onClick={() => ButtonClick()}>{TextValues.langButton(localStorage.getItem("lang"))}</Button>
                    <Button onClick={openCart}><AddShoppingCart />{cartItems.length > 0 ? cartItems.length : null}</Button>

                </nav>
            </CSSTransition>
            <button onClick={toggleNav} className="Burger">
                <Menu />
            </button>
        </header >
    )
}

export default Header;