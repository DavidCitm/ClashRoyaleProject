import React from 'react';
import './Footer.css'; // Crearemos este archivo abajo

export default function Footer() {
  return (
    <footer className="footer">
      <button className="footer-btn active">
        {/* Icono Cartas (Simulado con texto o SVG) */}
        <span className="footer-icon">🎴</span> 
      </button>
      
      <button className="footer-btn">
        {/* Icono Grid (Simulado) */}
        <span className="footer-icon">▦</span> 
      </button>
      
      <button className="footer-btn">
        {/* Icono Arena/Estadio (Simulado) */}
        <span className="footer-icon">🏟️</span> 
      </button>
    </footer>
  );
}