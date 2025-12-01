import React from 'react';
import './Footer.css';
import { useNavigate } from "react-router-dom";

// Importa tus imágenes
import imgCartas from '../assets/icono_cartas.png';
import imgMazo from '../assets/icono_mazo.png';
import imgBatalla from '../assets/icono_batalla.png';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      
      {/* Botón 1: Cartas */}
      <button className="footer-btn active">
        <img src={imgCartas} alt="Cartas" className="footer-icon-img" />
      </button>

      <button className="footer-btn" onClick={() => navigate("/mazo")}>
        <img src={imgMazo} alt="Mazo" className="footer-icon-img" />
      </button>

      {/* Botón 3: Arenas */}
      <button
        className="footer-btn"
        onClick={() => navigate("/arenas")}
      >
        <img src={imgBatalla} alt="Arenas" className="footer-icon-img" />
      </button>

    </footer>
  );
}
