import React from "react";
import logo from "../assets/img/logo.svg";
import "./Header.css";

export const Header = ({ size }) => {
  return (
    <header className={`header header-${size}`}>
      <div className="logo">
        <img src={logo} className="logoImage" alt="logo"></img>
      </div>
      <nav id="navigation">
        <a href="">Zimmer eröffnen</a>
        <a href="">FAQ</a>
      </nav>
    </header>
  );
};
