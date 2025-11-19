import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="left">
        <a href="#">Arenas</a>
      </div>

      <p className="center">Inicio</p>

      <nav className="right">
        <a href="#contacto">Mis Mazos</a>
      </nav>
    </footer>
  );
}
