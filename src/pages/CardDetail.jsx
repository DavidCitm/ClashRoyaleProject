import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchById } from "../pages/supabase";
import "./CardDetail.css";
import { useFavorites } from '../context/FavoritesContext';

import imgEspadaFlecha from '../assets/espada-flecha.png';

const MIN_ID = 1;
const MAX_ID = 125;

export default function CardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);

  const [personaje, setPersonaje] = useState(null);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    async function load() {
      setAnimating(true);
      setLoading(true);

      const [pData, sData] = await Promise.all([
        fetchById("personajes", "id", numericId),
        fetchById("personaje_stats", "id_personaje", numericId)
      ]);

      setPersonaje(pData[0]);
      setStats(sData);

      setLoading(false);
      setTimeout(() => setAnimating(false), 250);
    }

    load();
  }, [numericId]);

  const { toggleFavorite, isFavorite } = useFavorites();
  if (loading || !personaje) return null;

  const favorito = isFavorite(personaje.id);

  const goPrev = () => {
    if (numericId > MIN_ID) navigate(`/personaje/${numericId - 1}`);
  };

  const goNext = () => {
    if (numericId < MAX_ID) navigate(`/personaje/${numericId + 1}`);
  };

  return (
    <div className="detail-container">
      <div className={`card-panel ${animating ? "animating" : ""}`}>

        {/* Volver */}
        <button className="btn-volver-atras" onClick={() => navigate("/")}>
          <img src={imgEspadaFlecha} alt="Volver" className="icono-volver" />
        </button>

        {/* Favorito */}
        <button
          onClick={() => toggleFavorite(personaje)}
          className="favorite-circular-btn"
          style={{ backgroundColor: favorito ? 'gold' : 'rgba(0,0,0,0.35)' }}
        >
          {favorito ? '★' : '☆'}
        </button>

        {/* Flecha IZQUIERDA */}
        <button
          className="nav-arrow left"
          onClick={goPrev}
          disabled={numericId === MIN_ID}
        >
          &lt;
        </button>

        {/* Flecha DERECHA */}
        <button
          className="nav-arrow right"
          onClick={goNext}
          disabled={numericId === MAX_ID}
        >
          &gt;
        </button>

        <img
          className="character-image"
          src={personaje.imagen_url}
          alt={personaje.nombre}
        />

        <h1 className="title">{personaje.nombre}</h1>

        <p className="info"><strong>Rareza:</strong> {personaje.rareza}</p>
        <p className="info"><strong>Coste Elixir:</strong> {personaje.coste_elixir}</p>

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
