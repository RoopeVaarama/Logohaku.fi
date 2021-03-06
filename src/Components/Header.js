import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import TextValues from '../tools/TextValues';
import "./Header.css";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../assets/paisto.png";
import { Button } from "react-bootstrap";


const Header = () => {

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
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/tilaus"><FontAwesomeIcon size="2x" icon={"shopping-cart"}/></Link>
                    <Button onClick={() => ButtonClick()}>{TextValues.langButton(localStorage.getItem("lang"))}</Button>
                    
                </nav>
            </CSSTransition>
            <button onClick={toggleNav} className="Burger">
                burger menu
          </button>
        </header >
    )
}

export default Header;