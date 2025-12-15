import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchById } from "../pages/supabase";
import { useFavorites } from "../context/FavoritesContext";
import "./CardDetail.css";

// Imagen del botón volver
import imgEspadaFlecha from "../assets/espada-flecha.png";

// Límites de navegación entre cartas
const MIN_ID = 1;
const MAX_ID = 125;

export default function CardDetail() {
  

  // ===== ROUTER =====
  const { id } = useParams();     // id de la carta desde la URL
  const navigate = useNavigate();
  const numericId = Number(id);


  // ===== ESTADO =====
  const [personaje, setPersonaje] = useState(null); // datos principales
  const [stats, setStats] = useState([]);           // stats
  const [loading, setLoading] = useState(true);     // estado de carga
  const [animating, setAnimating] = useState(false); // animacion al cambiar carta

  // Favoritos (context)
  const { toggleFavorite, isFavorite } = useFavorites();


  // ===== CARGA DE DATOS ===== 
  useEffect(() => {
    async function load() {
      setLoading(true);
      setAnimating(true);

      // Cargar personaje y stats en paralelo
      const [pData, sData] = await Promise.all([
        fetchById("personajes", "id", numericId),
        fetchById("personaje_stats", "id_personaje", numericId),
      ]);

      setPersonaje(pData[0]);
      setStats(sData);

      setLoading(false);

      // Pequeña animación al cambiar de carta
      setTimeout(() => setAnimating(false), 250);
    }

    load();
  }, [numericId]);

  if (loading || !personaje) return null;


  // ===== NAVEGACION ENTRE CARTAS ===== 
  const favorito = isFavorite(personaje.id);

  // -1 
  const goPrev = () => {
    if (numericId > MIN_ID) {
      navigate(`/personaje/${numericId - 1}`);
    }
  };

  // +1
  const goNext = () => {
    if (numericId < MAX_ID) {
      navigate(`/personaje/${numericId + 1}`);
    }
  };


  // ===== RENDER ===== 
  return (
    <div className="detail-container">
      <div className={`card-panel ${animating ? "animating" : ""}`}>

        {/* Botón volver a la Home */}
        <button
          className="btn-volver-atras"
          onClick={() => navigate("/")}
        >
          <img
            src={imgEspadaFlecha}
            alt="Volver"
            className="icono-volver"
          />
        </button>

        {/* Botón de favoritos */}
        <button
          className="favorite-circular-btn"
          onClick={() => toggleFavorite(personaje)}
          style={{
            backgroundColor: favorito
              ? "gold"
              : "rgba(0,0,0,0.35)",
          }}
        >
          {favorito ? "★" : "☆"}
        </button>

        {/* Navegación izquierda */}
        <button
          className="nav-arrow left"
          onClick={goPrev}
          disabled={numericId === MIN_ID}
        >
          &lt;
        </button>

        {/* Navegación derecha */}
        <button
          className="nav-arrow right"
          onClick={goNext}
          disabled={numericId === MAX_ID}
        >
          &gt;
        </button>

        {/* Imagen del personaje */}
        <img
          className="character-image"
          src={personaje.imagen_url}
          alt={personaje.nombre}
        />

        {/* Información básica */}
        <h1 className="title">{personaje.nombre}</h1>

        <p className="info">
          <strong>Rareza:</strong> {personaje.rareza}
        </p>
        <p className="info">
          <strong>Coste Elixir:</strong> {personaje.coste_elixir}
        </p>

        {/* Estadísticas */}
        <h2 className="stats-title">Stats</h2>

        <div className="stats-list">
          {stats.map((s) => (
            <div className="stat-card" key={s.nivel}>
              <h3>Nivel {s.nivel}</h3>
              <p>❤️ Vida: <strong>{s.vida}</strong></p>
              <p>⚔️ Daño: <strong>{s.dano}</strong></p>
              <p>⏱️ Vel. Ataque: <strong>{s.velocidad_ataque}</strong></p>
              <p>🏃 Vel. Movimiento: <strong>{s.velocidad_movimiento}</strong></p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
