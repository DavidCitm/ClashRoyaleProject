import React from 'react';
import './Footer.css';
import { useNavigate, useLocation } from "react-router-dom";

// Iconos
import imgCartas from '../assets/icono_cartas.png';
import imgMazo from '../assets/icono_mazo.png';
import imgBatalla from '../assets/icono_batalla.png';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Función para saber si una ruta está activa
  const isActive = (path) => location.pathname === path;

  return (
    <footer className="footer">
      
      {/* CARTAS */}
      <button
        className={`footer-btn ${isActive("/") ? "active" : ""}`}
        onClick={() => navigate("/")}
      >
        <img src={imgCartas} alt="Cartas" className="footer-icon-img" />
      </button>

      {/* MAZO */}
      <button
        className={`footer-btn ${isActive("/mazo") ? "active" : ""}`}
        onClick={() => navigate("/mazo")}
      >
        <img src={imgMazo} alt="Mazo" className="footer-icon-img" />
      </button>

      {/* ARENAS */}
      <button
        className={`footer-btn ${isActive("/arenas") ? "active" : ""}`}
        onClick={() => navigate("/arenas")}
      >
        <img src={imgBatalla} alt="Arenas" className="footer-icon-img" />
      </button>

    </footer>
  );
}
