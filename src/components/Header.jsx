import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

export default function Header() {
  return (
    <header className="header">

      {/* GIF CENTRADO */}
      <div className="header-center">
        <img
          src="/clashroyale.gif"
          alt="Clash Royale"
          className="header-gif"
        />
      </div>

      {/* BLOQUE DERECHA */}
      <div className="header-stats">

        {/* Botón favoritos */}
        <div className="stat-box star-box">
          <Link to="/favorits">
            <span className="icon">⭐</span>
          </Link>
        </div>

        {/* Botón inicio */}
        <div className="stat-box upgrade-box">
          <Link to="/">
            <span className="icon">▲</span>
          </Link>
        </div>

        {/* Barra */}
        <div className="stat-bar">
          <div className="bar-fill"></div>
        </div>

      </div>
    </header>
  );
}
