import React from 'react';
import './Footer.css';

// IMPORTA TUS IMÁGENES AQUÍ
// Asegúrate de que los nombres coincidan con los que guardaste en src/assets
import imgCartas from '../assets/icono_cartas.png';
import imgMazo from '../assets/icono_mazo.png';
import imgBatalla from '../assets/icono_batalla.png';

export default function Footer() {
  return (
    <footer className="footer">
      
      {/* Botón 1: Cartas (Activo por defecto como ejemplo) */}
      <button className="footer-btn active">
        <img src={imgCartas} alt="Cartas" className="footer-icon-img" />
      </button>
      
      {/* Botón 2: Mazo/Grid */}
      <button className="footer-btn">
        <img src={imgMazo} alt="Mazo" className="footer-icon-img" />
      </button>
      
      {/* Botón 3: Batalla/Estadio */}
      <button className="footer-btn">
        <img src={imgBatalla} alt="Batalla" className="footer-icon-img" />
      </button>

    </footer>
  );
}