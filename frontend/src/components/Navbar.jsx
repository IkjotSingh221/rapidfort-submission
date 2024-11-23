import React from "react";
import Logo from "../assets/logo.png";

const Navbar = () => {
    return (
        <header>
            <div className="logo">
                <img src={Logo} alt="RapidFort" />
            </div>
            <div className="brand-name">
                <span className="white-text">Rapid</span>
                <span className="green-text">Fort</span>
            </div>
        </header>
    );
}

export default Navbar