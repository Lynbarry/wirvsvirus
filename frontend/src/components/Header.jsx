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
        <a href="/faq">Zimmer eröffnen</a>
        <a target="blank" href="https://docs.google.com/document/d/1iU-KhLWcl6hAg8GHEPamBzc90jk6vw3B2_R-V7GUyvo/edit#heading=h.d8waaqmdpqay">FAQ</a>
      </nav>
    </header>
  );
};
