import React, { useState } from "react";


import React from "react";

export default function Header() {
  return (
    <header>
      <h1>Mi Sitio</h1>
      <nav>
        <a href="#">Inicio</a>
        <a href="#cartas">Cartas</a>
        <a href="#arenas">Arenas</a>
        <a href="#favoritos">Favoritos</a>
      </nav>
    </header>
  );
}