import React from "react";
import "./Header.css";
import logo from "../assets/LogoClash.png"; // Ajusta la ruta de tu imagen

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
      <span className="header-title">Project Royale</span>
    </header>
  );
};

export default Header;
