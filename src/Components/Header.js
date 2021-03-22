import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import TextValues from '../tools/TextValues';
import "./Header.css";
import { CSSTransition } from "react-transition-group";
import logo from "../assets/paisto.png";
import { Button } from "react-bootstrap";
import  MenuIcon from '@material-ui/icons/Menu';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


const Header = ({ lang, items }) => {
    console.log(items)

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
                    <Link to="/ostoskori"><AddShoppingCartIcon />{items}</Link>

                </nav>
            </CSSTransition>
            <button onClick={toggleNav} className="Burger">
                <MenuIcon />
            </button>
        </header >
    )
}
//<Link to="/">{TextValues.home(lang)}</Link>
//<Link to="/tietoja">{TextValues.aboutUs(lang)}</Link>
export default Header;