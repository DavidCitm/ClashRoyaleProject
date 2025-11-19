import React from "react";
import "./header.css";


export default function Header() {
  return (
    <header>
      <h1>Mi Sitio</h1>
      <nav>
        <a href="#">Inicio</a>
        <a href="#cartas">Cartas</a>
        <a href="#arenas">Arenas</a>
        <a href="#mazos">Tus mazos</a>
      </nav>
    </header>
  );
}