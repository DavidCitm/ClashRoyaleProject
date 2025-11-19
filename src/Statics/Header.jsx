import React from "react";
import "./header.css";

export default function Header() {
  return (
    <header>
      <div className="left">
        <a href="#">Inicio</a>
        <a href="#servicios">Servicios</a>
      </div>

      <h1 className="center">Clash Royale</h1>

      <nav className="right">
        <a href="#equipo">Equipo</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>
  );
}
