import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <button>Arenas</button>
      </div>
      <div className="footer-center">
        <button>Inicio</button>
      </div>
      <div className="footer-right">
        <button>Mazos</button>
      </div>
    </footer>
  );
};

export default Footer;