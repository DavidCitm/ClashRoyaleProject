import React from 'react';
import './Header.css'; // Crearemos este archivo abajo

export default function Header() {
  return (
    <header className="header">
      {/* Contenedor derecho alineado al final */}
      <div className="header-stats">
        
        {/* Ícono de Estrella (Nivel) */}
        <div className="stat-box star-box">
          <span className="icon">⭐</span> {/* Puedes usar una imagen/svg aquí */}
        </div>

        {/* Ícono de Subida (Flecha) */}
        <div className="stat-box upgrade-box">
          <span className="icon">▲</span>
        </div>

        {/* Barra de progreso / Nombre */}
        <div className="stat-bar">
          <div className="bar-fill"></div>
        </div>
        
      </div>
    </header>
  );
}