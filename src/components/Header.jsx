import React from 'react';
import { Link } from "react-router-dom"; // Importamos Link
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      {/* Contenedor derecho alineado al final */}
      <div className="header-stats">
        
        {/* Ícono de Estrella (Nivel) */}
        <div className="stat-box star-box">
          <span className="icon">⭐</span>
        </div>

        {/* Ícono de Subida (Flecha) → Ahora clickeable */}
        <div className="stat-box upgrade-box">
          <Link to="/">
            <span className="icon">▲</span>
          </Link>
        </div>

        {/* Barra de progreso / Nombre */}
        <div className="stat-bar">
          <div className="bar-fill"></div>
        </div>
        
      </div>
    </header>
  );
}
