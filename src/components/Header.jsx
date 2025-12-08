import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-stats">

        {/* Boton para favs */}
        <div className="stat-box star-box">
          <Link to="/favorits">
            <span className="icon" style={{ cursor: "pointer" }}>⭐</span>
          </Link>
        </div>

        {/* Boton que de momento vuelve al inicio */}
        <div className="stat-box upgrade-box">
          <Link to="/">
            <span className="icon" style={{ cursor: "pointer" }}>▲</span>
          </Link>
        </div>

        {/* Barra  */}
        <div className="stat-bar">
          <div className="bar-fill"></div>
        </div>

      </div>
    </header>
  );
}